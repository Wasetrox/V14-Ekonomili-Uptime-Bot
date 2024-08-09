# Discord.js v14 Ekonomi Botu

Bu proje, Discord.js v14 ve JavaScript kullanılarak geliştirilmiş bir ekonomi sistemine sahip bir Discord botudur. Bu bot, kullanıcıların sanal para biriktirmesini, harcamasını ve çeşitli ekonomi komutlarıyla etkileşime girmesini sağlar.

## Özellikler

- **Para Kazanma:** Kullanıcılar günlük ödüller, bahisler, görevler ve diğer yöntemlerle para kazanabilirler.
- **Mağaza Sistemi:** Kullanıcılar, biriktirdikleri parayla mağazadan eşyalar satın alabilir.
- **Kullanıcı Cüzdanı:** Kullanıcılar kendi bakiyelerini kontrol edebilir.
- **Hediye Gönderme:** Kullanıcılar birbirlerine para gönderebilir.
- **Ekstra Özellikler:** Botta rastgele etkinlikler, bonuslar ve özel komutlar bulunabilir.

## Gereksinimler

- Node.js 16.9.0 veya üzeri
- Discord.js v14
- Bir Discord Botu (API Token ile birlikte)

## Kurulum

1. Bu depoyu klonlayın:
    ```bash
    git clone https://github.com/Wasetrox/V14-Ekonomili-Uptime-Bot.git
    cd discord-ekonomi-botu
    ```

2. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3. `.env` dosyasını oluşturun ve Discord botunuzun token'ını ve gerekli diğer bilgileri girin:
    ```plaintext
    TOKEN=YOUR_DISCORD_BOT_TOKEN
    ```

4. Botu çalıştırın:
    ```bash
    node index.js
    ```

## Kullanım

Botun çalışmasını sağlamak için aşağıdaki komutları kullanabilirsiniz:

- **/bakiye**: Kullanıcının cüzdanındaki parayı gösterir.
- **/günlük**: Günlük ödül verir.
- **/mağaza**: Mağazadaki eşyaları gösterir.
- **/gönder [kullanıcı] [miktar]**: Başka bir kullanıcıya para gönderir.

## Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, lütfen bir [pull request](https://github.com/kullaniciadi/discord-ekonomi-botu/pulls) açın veya bir sorun bildirin.

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
