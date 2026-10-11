---
title: Coding agent’ınız ‘Active’in ne demek olduğunu bilmemeli
description: Agent’lar rollerle konuşur, issue tracker’lar kendi state’leriyle. Baron bu ikisini neden ayrı tutuyor, karışınca neler bozuluyor?
date: 2026-10-12
lang: tr
project: baron
tags: [agents, work-tracking]
author: Zanaat
status: published
translation: why-your-coding-agent-shouldnt-know-what-active-means
---

Bir coding agent’a issue tracker’ınıza ilk kez erişim verdiğinizde, prompt’a genelde şuna benzer bir
şey yazılır: *bir task’a başladığında onu Active’e çek, pull request açılınca Test’e çek.* Bu çalışır.
Ta ki agent ikinci bir ekiple karşılaşana kadar.

Her tracker’da bir işin geçtiği aşamalar aşağı yukarı aynıdır: iş sırada bekliyor, biri üzerinde
çalışıyor, review’da, bitti. Değişen, bu aşamalara verilen isimler. Birlikte çalıştığımız bir Azure
DevOps ekibinde bunlar `New`, `Active`, `Test` ve `Closed`. Bir Jira projesinde genelde *To Do*,
*In Progress*, *In Review*, *Done* görürsünüz. Bir Linear ekibi review aşamasına *Code Review*
diyebilir. GitHub Issues’ta ise yalnızca iki state var, `open` ve `closed`; aradaki her şey birinin
uydurduğu bir label.

`Active`’i öğrenen bir agent işin kendisini değil, tek bir ekibin process template’ini öğrenmiş olur.

## Sorun nerede çıkıyor

Ortada genelde bir crash olmaz. Hatalar sessizdir; asıl sorun da bu.

- **Agent tahmin yürütür.** Azure terimleriyle prompt’lanmış bir agent’tan Jira board’unda bir task’a
  başlaması istendiğinde önce `Active`’i dener, reddedilince kendince bir şey uydurur: `In Progress`,
  `Doing`, `Started`. Bazen doğrusunu tutturur. Bazen de var olan ama başka bir anlama gelen bir
  state’e düşer.
- **State tek başına yetmez.** Azure Boards’ta bir item `Active` state’inde olup yine de yanlış board
  kolonunda durabilir, çünkü kolon ayrı bir alan. Prompt “Active’e çek” dedi, state değişti, kart
  yerinden kıpırdamadı. Stand-up’a kadar kimse fark etmez.
- **Süreç değişir, prompt eskide kalır.** Ekip bir kolonun adını değiştirir, araya bir QA adımı
  ekler, review’u ikiye böler. Eski isimleri yazan her prompt artık yanlıştır ve hiçbiri bunu size
  söylemez.

Üçü de aynı hatanın farklı yüzleri: tracker’ın kendi kelimeleri, niyetin durması gereken yere
sızmış.

## Agent’a state değil, rol verin

[Baron](https://baron.zanaat.dev/), bir coding agent’ın tracker’ın jargonunu bilmeden onunla
çalışabilmesi için geliştirdiğimiz katman. Agent hiçbir zaman tracker’a özgü bir state adı kullanmaz;
beş workflow rolüyle konuşur:

`backlog → ready → in_progress → in_review → done`

Blocked bu rollerden biri değil. Item hangi roldeyse onun yanında duran bir flag; blocker kalkınca iş
tahmin edilen bir yere değil, gerçekte kaldığı yere döner.

Baron’un `task-start` recipe’sinde bir task’a başlamak bir kez ve rollerle yazılır:

```yaml
- do: issue.transition
  as: issue
  with:
    id: ${issue.id}
    role: in_progress
```

Aynı adım Azure DevOps, Jira, Linear ve GitHub’da çalışır. Ekipten ekibe değişen recipe değil, bir
map.

## Map’i kim yazıyor

Rollerden tracker’ın kendi state’lerine çeviri, repo’ya commit’lenen tek bir dosyada duruyor:
`.baron/policy.json`. Yukarıdaki Azure DevOps ekibi için şöyle görünüyor:

```json
"roleMap": {
  "azure-devops": {
    "stateKey": "state",
    "states": {
      "backlog": { "state": "New" },
      "in_progress": { "state": "Active", "boardColumn": "In Progress" },
      "in_review": { "state": "Test", "boardColumn": "Test" },
      "done": { "state": "Closed" }
    }
  }
}
```

Burada iki detay önemli. Birincisi, board kolonu state’le birlikte taşınır; yani “in progress” hem
state’i hem de ekibin gerçekten baktığı kolonu ifade eder. İkincisi, bunu kimse elle yazmadı:
`baron init` tracker’daki gerçek state’leri ve kolonları okur, bir map önerir, bir insan onaylar.
`in_review`’in sizin board’unuzda ne anlama geldiğine agent karar vermez. Board’u bilen biri bir kez
karar verir, o kadar.

## Map’te bir boşluk varsa

Map’e tekrar bakın: `ready` yok. O ekibin böyle bir adımı yok; işler `New`’dan doğrudan `Active`’e
geçiyor.

Peki bir recipe orada `ready` isterse ne olur? Baron, daha hiçbir şey yazılmadan isteği reddeder ve
nedenini söyler:

```text
Role 'ready' has no native mapping for provider 'azure-devops'. Run `baron init` to (re)build
the role map, or add it to policy.roleMap.azure-devops.states.
```

İşin özü bu ret. Eksik bir capability asla sessizce doldurulmaz. Her gap, ekibin seçtiği bir
policy’den geçer: `error` yukarıdaki gibi bir mesajla durur; `emulate` eksik parçayı taklit eder
(GitHub’da parent/child issue yok, Baron bu hiyerarşiyi bir `parent:<id>` label’ıyla taşıyabilir);
`degrade` adımı atlar ve bunu bir warning olarak log’a yazar. Asla yaşanmayan şey ise sessiz
senaryo: agent’ın kafasına göre bir state uydurduğu ve board’un yavaş yavaş gerçeklikten koptuğu
senaryo.

## Hangi bilgi nerede durmalı

Rolleri state’lerden ayırmanın bir faydası daha var: *sürecinizin ne olduğunu*, *tool’unuzun ona ne
dediğinden* ayırır. “Bir pull request açılınca item’ı review’a çek” bir süreçtir; ekibin okuyup
değiştirebileceği düz YAML olarak bir recipe’de durur. “Review burada `Test` diye geçiyor ve `Test`
kolonunda duruyor” ise terminolojidir; map’te durur. İkisinin de prompt’ta işi yok.

Bugün agent talimatları yazıyorsanız, Baron kullansanız da kullanmasanız da kural aynı: tracker’a
özgü isimleri talimatlara koymayın. Niyeti yazın, çeviriyi bir insanın onayladığı config’de tutun ve
gap’leri görünür kılın.

Agent’ınız sürecinizi bilmeli. ‘Active’in ne demek olduğunu bilmesine gerek yok.

---

Baron açık kaynak. `npx @zanaat/baron-cli init` ile kurabilir ya da rollerin, map’lerin ve gap
policy’lerinin nasıl çalıştığını [concepts rehberinde](https://baron.zanaat.dev/docs/concepts/)
okuyabilirsiniz.
