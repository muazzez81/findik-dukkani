// sepet.js
(function() {
    let sepet = [];
    const whatsappNo = "905327669102";

    // 1. Sepet Arayüzü için CSS Ekleme
    const style = document.createElement('style');
    style.innerHTML = `
        #sepet-kutusu {
            position: fixed; bottom: 20px; right: 20px;
            width: 300px; background: #fff; border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            font-family: 'Segoe UI', sans-serif; z-index: 9999;
            display: none; overflow: hidden; border: 1px solid #eee;
        }
        .sepet-baslik { background: #28a745; color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; }
        .sepet-liste { max-height: 200px; overflow-y: auto; padding: 10px; }
        .sepet-item { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; border-bottom: 1px solid #f9f9f9; padding-bottom: 5px; }
        .sepet-toplam { padding: 15px; background: #f8f9fa; border-top: 1px solid #eee; font-weight: bold; text-align: right; }
        .siparis-tamamla-btn { background: #25d366; color: white; text-align: center; padding: 12px; cursor: pointer; text-decoration: none; display: block; font-weight: bold; }
        .siparis-tamamla-btn:hover { background: #1ebe57; }
        .sepet-kapat { cursor: pointer; }
    `;
    document.head.appendChild(style);

    // 2. Sepet HTML Yapısını Oluşturma
    const sepetHtml = `
        <div id="sepet-kutusu">
            <div class="sepet-baslik">🛒 Sepetiniz <span class="sepet-kapat" id="sepet-kapat">✕</span></div>
            <div class="sepet-liste" id="sepet-liste"></div>
            <div class="sepet-toplam">Toplam: <span id="toplam-fiyat">0</span> TL</div>
            <div class="siparis-tamamla-btn" id="wp-siparis-btn">WhatsApp ile Sipariş Ver</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', sepetHtml);

    const sepetKutusu = document.getElementById('sepet-kutusu');
    const sepetListe = document.getElementById('sepet-liste');
    const toplamFiyatGosterge = document.getElementById('toplam-fiyat');

    // 3. Sepete Ekleme Fonksiyonu
    document.querySelectorAll('.sepete-ekle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ad = btn.getAttribute('data-urun');
            const fiyat = parseInt(btn.getAttribute('data-fiyat'));

            sepet.push({ ad, fiyat });
            sepetiGuncelle();
            sepetKutusu.style.display = 'block';
        });
    });

    // 4. Arayüzü Güncelleme
    function sepetiGuncelle() {
        sepetListe.innerHTML = '';
        let toplam = 0;

        sepet.forEach((item, index) => {
            toplam += item.fiyat;
            sepetListe.innerHTML += `
                <div class="sepet-item">
                    <span>${item.ad}</span>
                    <span>${item.fiyat} TL</span>
                </div>
            `;
        });

        toplamFiyatGosterge.innerText = toplam;
    }

    // 5. WhatsApp Mesajını Oluştur ve Gönder
    document.getElementById('wp-siparis-btn').addEventListener('click', () => {
        if (sepet.length === 0) return;

        let mesaj = "*Yeni Fındık Siparişi:*\n\n";
        sepet.forEach(item => {
            mesaj += `- ${item.ad} (${item.fiyat} TL)\n`;
        });
        mesaj += `\n*Toplam Tutar:* ${toplamFiyatGosterge.innerText} TL\n\nSiparişimi onaylıyorum, kargo bilgilerimi ileteceğim.`;

        const link = `https://wa.me/${whatsappNo}?text=${encodeURIComponent(mesaj)}`;
        window.open(link, '_blank');
    });

    // Sepeti kapatma butonu
    document.getElementById('sepet-kapat').onclick = () => sepetKutusu.style.display = 'none';

})();
