(function() {
    let sepet = [];
    const whatsappNo = "905327669102";

    // 1. SEPET PANELİ TASARIMI (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        #sepet-paneli {
            position: fixed; top: 80px; right: 20px;
            width: 320px; background: white; border-radius: 12px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            z-index: 10001; display: none; border: 2px solid #e67e22;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
        }
        .sepet-ust { background: #e67e22; color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
        .sepet-liste { max-height: 250px; overflow-y: auto; padding: 15px; color: #333; }
        .sepet-urun { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 8px; font-size: 14px; }
        .sepet-toplam-alan { padding: 15px; background: #fff8f2; border-top: 1px solid #eee; text-align: right; }
        .sepet-toplam-alan strong { font-size: 18px; color: #d35400; }
        .wp-siparis-buton { background: #25d366; color: white; text-align: center; padding: 15px; cursor: pointer; border: none; width: 100%; font-size: 16px; font-weight: bold; display: block; transition: 0.3s; }
        .wp-siparis-buton:hover { background: #1ebe57; }
        #sepet-kapat-ikon { cursor: pointer; font-size: 20px; }
    `;
    document.head.appendChild(style);

    // 2. SEPET PANELİ HTML YAPISI
    const sepetHtml = `
        <div id="sepet-paneli">
            <div class="sepet-ust">
                <span>🛒 Sipariş Özetiniz</span>
                <span id="sepet-kapat-ikon">×</span>
            </div>
            <div class="sepet-liste" id="sepet-icerik-listesi">
                <p style="text-align:center; color:#999;">Sepetiniz henüz boş.</p>
            </div>
            <div class="sepet-toplam-alan">
                Toplam: <strong id="sepet-toplam-tutar">0</strong> <strong>TL</strong>
            </div>
            <button class="wp-siparis-buton" id="wp-onay-buton">
                <i class="fab fa-whatsapp"></i> Siparişi WhatsApp'la Bitir
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', sepetHtml);

    // Elementleri Tanımla
    const panel = document.getElementById('sepet-paneli');
    const liste = document.getElementById('sepet-icerik-listesi');
    const toplamGosterge = document.getElementById('sepet-toplam-tutar');
    const menuSayac = document.getElementById('sepet-sayaci-menu');

    // 3. SEPETİ AÇ / KAPAT MANTIĞI
    const sepetMenuButonu = document.getElementById('sepet-menu-item');
    if(sepetMenuButonu) {
        sepetMenuButonu.addEventListener('click', function(e) {
            e.preventDefault();
            panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
        });
    }

    document.getElementById('sepet-kapat-ikon').onclick = () => {
        panel.style.display = 'none';
    };

    // 4. SEPETE EKLEME FONKSİYONU
    document.querySelectorAll('.sepete-ekle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const urunAd = this.getAttribute('data-urun');
            const urunFiyat = parseInt(this.getAttribute('data-fiyat'));

            sepet.push({ ad: urunAd, fiyat: urunFiyat });
            
            sepetiGuncelle();
            panel.style.display = 'block'; // Ürün eklenince sepeti otomatik aç
        });
    });

    function sepetiGuncelle() {
        // Menüdeki sayacı güncelle
        if(menuSayac) menuSayac.innerText = sepet.length;

        // Listeyi temizle ve yeniden yaz
        liste.innerHTML = '';
        let toplam = 0;

        if(sepet.length === 0) {
            liste.innerHTML = '<p style="text-align:center; color:#999;">Sepetiniz henüz boş.</p>';
        } else {
            sepet.forEach((item) => {
                toplam += item.fiyat;
                liste.innerHTML += `
                    <div class="sepet-urun">
                        <span>${item.ad}</span>
                        <strong>${item.fiyat} TL</strong>
                    </div>
                `;
            });
        }
        toplamGosterge.innerText = toplam;
    }

    // 5. WHATSAPP'A GÖNDERME
    document.getElementById('wp-onay-buton').onclick = function() {
        if (sepet.length === 0) {
            alert("Lütfen önce ürün ekleyin.");
            return;
        }

        let mesaj = "*Yeni Fındık Siparişi (Düzce'den):*\n\n";
        sepet.forEach((item, index) => {
            mesaj += `${index + 1}. ${item.ad} - ${item.fiyat} TL\n`;
        });
        mesaj += `\n*Toplam Tutar:* ${toplamGosterge.innerText} TL\n\nAdres ve kargo detayları için bilgi bekliyorum.`;

        const wpLink = `https://wa.me/${whatsappNo}?text=${encodeURIComponent(mesaj)}`;
        window.open(wpLink, '_blank');
    };

})();
