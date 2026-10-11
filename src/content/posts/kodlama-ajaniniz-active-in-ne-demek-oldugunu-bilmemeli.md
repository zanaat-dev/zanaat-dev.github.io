---
title: Kodlama ajanınız ‘Active’in ne demek olduğunu bilmemeli
description: Ajanlar rollerle konuşur; iş takip araçları kendi durum adlarıyla. Baron bu ikisini neden ayrı tutuyor ve karışınca ne bozuluyor.
date: 2026-10-12
lang: tr
project: baron
tags: [agents, work-tracking]
author: Zanaat
status: published
translation: why-your-coding-agent-shouldnt-know-what-active-means
---

Bir kodlama ajanına iş takip aracınıza ilk kez dokunma izni verdiğinizde, talimat genellikle şöyle
bir şey der: *bir göreve başladığında onu Active’e taşı; pull request açılınca Test’e taşı.*
Çalışır. Ajan ikinci bir ekiple karşılaşana kadar çalışmaya devam eder.

Her iş takip aracının, bir işin aynı birkaç anı için kendi kelimeleri vardır: iş bekliyor, biri
üzerinde çalışıyor, inceleniyor, bitti. Ayrıştıkları yer kelimelerdir. Birlikte çalıştığımız bir
Azure DevOps ekibinde bu anlar `New`, `Active`, `Test` ve `Closed`. Bir Jira projesi genellikle
*To Do*, *In Progress*, *In Review*, *Done* der. Bir Linear ekibi incelemeye *Code Review* diyebilir.
GitHub Issues’ın yalnızca iki durumu vardır, `open` ve `closed`; aradaki her şey birinin uydurduğu
bir etikettir.

`Active`i öğrenmiş bir ajan işi değil, bir ekibin süreç şablonunu öğrenmiştir.

## Gerçekte ne bozuluyor

Nadiren bir çökme olur. Hatalar sessizdir ve asıl sorun da budur.

- **Ajan tahmin eder.** Azure kelimeleriyle hazırlanmış bir ajandan Jira panosunda bir göreve
  başlaması istenince `Active`i dener, reddedilir ve doğaçlama yapar: `In Progress`, `Doing`,
  `Started`. Bazen doğrusunu bulur. Bazen var olan ama başka bir anlama gelen bir duruma düşer.
- **Durum, resmin tamamı değildir.** Azure Boards’ta bir öğe `Active` durumunda olup yine de yanlış
  pano sütununda durabilir, çünkü sütun ayrı bir alandır. Talimat “Active’e taşı” dedi, durum
  değişti, kart olduğu yerde kaldı. Günlük toplantıya kadar kimse fark etmez.
- **Süreç talimatın altından değişir.** Ekip bir sütunun adını değiştirir, bir test adımı ekler,
  incelemeyi ikiye böler. Eski adları yazan her talimat artık yanlıştır ve hiçbiri bunu söylemez.

Hepsi aynı hatadır: aracın kendi kelimeleri, niyetin durması gereken yere sızmıştır.

## Ajana bunun yerine roller verin

[Baron](https://baron.zanaat.dev/), bir kodlama ajanının iş takip aracını onun lehçesini bilmeden
yürütebilmesi için yaptığımız katman. Ajan hiçbir zaman aracın kendi durum adını söylemez. Beş iş
akışı rolüyle konuşur:

`backlog → ready → in_progress → in_review → done`

Engellenmiş olmak bunlardan biri değildir. Öğenin hangi rolde olduğundan bağımsız duran bir
işarettir; engel kalkınca iş bir tahmine değil, gerçekte olduğu yere döner.

Baron’un `task-start` recipe’sinde bir göreve başlamak bir kez, rollerle yazılır:

```yaml
- do: issue.transition
  as: issue
  with:
    id: ${issue.id}
    role: in_progress
```

Aynı adım Azure DevOps, Jira, Linear ve GitHub’da çalışır. Ekipten ekibe değişen recipe değil,
bir haritadır.

## Harita ve onu kim yazıyor

Rollerden aracın kendi durumlarına çeviri, commit’lenen tek bir dosyada durur: `.baron/policy.json`.
Yukarıdaki Azure DevOps ekibi için şöyle:

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

İki ayrıntı önemli. Pano sütunu durumla birlikte taşınır; yani “in progress”, durum *ve* ekibin
gerçekten baktığı sütun demektir. Ve bunu kimse elle yazmadı: `baron init` aracın gerçek durumlarını
ve sütunlarını okur, haritayı önerir, bir insan onaylar. `in_review`in panonuzda ne anlama geldiğine
ajan karar vermez. Panoyu bilen biri bir kez karar verir.

## Haritada bir boşluk olunca

Haritaya yeniden bakın: `ready` yok. O ekipte böyle bir adım yok; işleri `New`den doğrudan
`Active`e geçiyor.

Peki orada bir recipe `ready` isterse ne olur? Baron, hiçbir şey yazılmadan önce reddeder ve
nedenini söyler:

```text
Role 'ready' has no native mapping for provider 'azure-devops'. Run `baron init` to (re)build
the role map, or add it to policy.roleMap.azure-devops.states.
```

Asıl mesele bu ret. Eksik bir yetenek hiçbir zaman sessizce doldurulmaz. Her boşluk, ekibin seçtiği
bir politikadan geçer: `error`, yukarıdaki gibi bir mesajla durur; `emulate` eksik parçayı taklit
eder (GitHub’da üst ve alt iş ilişkisi yoktur, Baron bu hiyerarşiyi bir `parent:<id>` etiketiyle
taşıyabilir); `degrade` adımı atlar ve bunu söyleyen bir uyarı yazar. Hiçbir zaman olmayan şey
sessiz olanıdır: ajanın bir durum uydurduğu ve panonun kaydığı.

## Görüş nereye ait

Rolleri durumlardan ayırmanın ikinci bir etkisi var: *sürecinizin ne olduğunu*, *aracınızın ona ne
dediğinden* ayırır. “Bir pull request açılınca öğeyi incelemeye taşı” süreçtir; ekibin okuyup
değiştirebileceği düz YAML olarak bir recipe’de durur. “İnceleme burada `Test` diye geçer ve `Test`
sütunundadır” kelime dağarcığıdır; haritada durur. İkisi de bir talimata ait değildir.

Bugün ajan talimatları yazıyorsanız, Baron’la ya da onsuz, kural geçerli: aracın kendi adlarını
talimatların dışında tutun. Niyeti adlandırın, çeviriyi bir insanın onayladığı yapılandırmada tutun
ve boşlukları sesli yapın.

Ajanınız sürecinizi bilmeli. ‘Active’in ne demek olduğunu bilmesine gerek yok.

---

Baron açık kaynak. `npx @zanaat/baron-cli init` ile kurun ya da rollerin, haritaların ve boşluk
politikalarının nasıl çalıştığını [kavramlar rehberinde](https://baron.zanaat.dev/docs/concepts/)
okuyun.
