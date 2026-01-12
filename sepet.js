(function() {
    let sepet = [];
    const whatsappNo = "905327669102";

    // 1. Sepet Paneli Tasarımı (Menüden aşağı açılan kutu)
    const style = document.createElement('style');
    style.innerHTML = `
        #sepet-paneli {
            position: fixed; top: 70px; right: 20px;
            width: 320px; background: white; border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10001; display: none; border: 1px solid #eee;
            font-family: sans-serif;
        }
        .sepet-baslik { background: #28a745; color: white; padding: 12px; font-weight: bold; border-radius: 10px 10px 0 0; display: flex; justify-content: space-between; }
        .sepet-liste { max-height: 300px; overflow-y: auto; padding: 15px; color: #333; }
        .sepet-item { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #f9f9f9; padding-bottom: 5px; font-size: 14px; }
        .sepet-toplam { padding: 15px; background: #f8f9fa; font-weight: bold; text-align: right; border-top: 1px solid #eee; }
        .siparis-btn { background: #25d366; color: white; text-align: center; padding: 12px; cursor: pointer; display: block; text-decoration: none; font-weight: bold; width: 100%; border: none; }
    `;
    document.head.appendChild(style);

    // 2. Sepet Paneli HTML
    const panelHtml = `
        <div id="sepet-paneli">
            <div class="sepet-baslik">🛒 Sipariş Özetiniz <span id="sepet-kapat" style="cursor:pointer">✕</span></div>
            <div class="sepet-liste" id="sepet-liste-icerik"></div>
            <div class="sepet-toplam">Toplam: <span id="toplam-tutar">0</span> TL</div>
            <button class="siparis-btn" id="wp-gonder">WhatsApp ile Siparişi Bitir</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHtml);

    const panel = document.getElementById('sepet-paneli');
    const sayac = document.getElementById('sepet-sayaci-menu');
    const liste = document.getElementById('sepet-liste-icerik');
    const toplamGosterge = document.getElementById('toplam-tutar');

    // Menüdeki sepet butonuna basınca paneli aç/kapat
    document.getElementById('sepet-menu-item').onclick = () => {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    };
    document.getElementById('sepet-kapat').onclick = (e) => {
        e.stopPropagation();
        panel.style.display = 'none';
    };

    // 3. Sepete Ekleme Fonksiyonu
    document.querySelectorAll('.sepete-ekle-btn').forEach(btn => {
        btn.onclick = (e) => {
            const ad = btn.getAttribute('data-urun');
            const fiyat = parseInt(btn.getAttribute('data-fiyat'));
            sepet.push({ ad, fiyat });
            
            // Güncelleme
            sayac.innerText = sepet.length;
            sepetiCiz();
            panel.style.display = 'block'; // Ürün eklenince sepeti göster
        };
    });

    function sepetiCiz() {
        liste.innerHTML = sepet.length === 0 ? '<p>Sepetiniz boş.</p>' : '';
        let toplam = 0;
        sepet.forEach(item => {
            toplam += item.fiyat;
            liste.innerHTML += `<div class="sepet-item"><span>${item.ad}</span><strong>${item.fiyat} TL</strong></div>`;
        });
        toplamGosterge.innerText = toplam;
    }

    // 4. WhatsApp Gönderimi
    document.getElementById('wp-gonder').onclick = () => {
        if (sepet.length === 0) return;
        let metin = "*Fındık Sepeti Siparişim:*\n";
        sepet.forEach(i => metin += `- ${i.ad} (${i.fiyat} TL)\n`);
        metin += `\n*Toplam:* ${toplamGosterge.innerText} TL`;
        window.open(`https://wa.me/${whatsappNo}?text=${encodeURIComponent(metin)}`);
    };
})();
