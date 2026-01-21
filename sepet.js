// 1. SEPET DEĞİŞKENLERİ VE TEMEL FONKSİYONLAR
let sepet = [];

function sepeteEkle(ad, fiyat) {
    const varolanUrun = sepet.find(item => item.ad === ad);
    if (varolanUrun) {
        varolanUrun.adet += 1;
    } else {
        sepet.push({ ad: ad, fiyat: parseInt(fiyat), adet: 1 });
    }
    sepetiGuncelle();
    console.log("Ürün eklendi:", ad);
}

function miktarAzalt(index) {
    if (sepet[index].adet > 1) { 
        sepet[index].adet -= 1; 
    } else { 
        sepet.splice(index, 1); 
    }
    sepetiGuncelle();
}

function miktarArtir(index) {
    sepet[index].adet += 1;
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const liste = document.getElementById("sepet-listesi");
    const toplamEl = document.getElementById("toplam-tutar");
    const sayac = document.getElementById("sepet-sayaci-menu");
    
    if(!liste) return;
    
    liste.innerHTML = "";
    let toplam = 0;
    
    sepet.forEach((urun, i) => {
        toplam += (urun.fiyat * urun.adet);
        const li = document.createElement("li");
        li.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee; font-size:14px;";
        li.innerHTML = `
            <span><strong>${urun.ad}</strong><br>${urun.fiyat} TL x ${urun.adet}</span> 
            <div style="display:flex; gap:5px;">
                <button onclick="miktarAzalt(${i})" style="padding:2px 8px;">-</button> 
                <button onclick="miktarArtir(${i})" style="padding:2px 8px;">+</button>
            </div>`;
        liste.appendChild(li);
    });
    
    if(toplamEl) toplamEl.innerText = toplam;
    if(sayac) sayac.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

// 2. SİPARİŞ VERME (GOOGLE FORMA GÖNDERME) FONKSİYONU
function siparisVer() {
    const adInput = document.getElementById("musteri-ad");
    const adresInput = document.getElementById("musteri-adres");
    const toplamEl = document.getElementById("toplam-tutar");

    const ad = adInput ? adInput.value.trim() : "";
    const adres = adresInput ? adresInput.value.trim() : "";
    const toplam = toplamEl ? toplamEl.innerText : "0";

    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }
    if (!ad || !adres) {
        alert("Lütfen adınızı ve adresinizi yazın.");
        return;
    }

    // YENİ FORM BİLGİLERİN
    const formID = "1FAIpQLSckeDlZKUpiSJGDXUlXcWTysxuGuxwZcPc6WaXAJRM4BrJbUQ"; 
    const urunDetay = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");
    const postUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

    const gizliForm = document.createElement('form');
    gizliForm.method = 'POST';
    gizliForm.action = postUrl;
    gizliForm.target = 'gizli_iframe';

    // BU NUMARALAR SENİN YENİ FORMUYLA EŞLEŞTİ
    const alanlar = {
        "entry.2069695679": ad,         // Müşteri Ad Soyad
        "entry.1018861343": adres,      // Adres
        "entry.1353130456": urunDetay,  // Sipariş Detayı
        "entry.1983802554": toplam      // Toplam Tutar
    };

    for (let key in alanlar) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = alanlar[key];
        gizliForm.appendChild(input);
    }

    let iframe = document.getElementById('gizli_iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'gizli_iframe';
        iframe.name = 'gizli_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    document.body.appendChild(gizliForm);
    gizliForm.submit();

    // WhatsApp Mesajı
    let mesaj = `*YENİ SİPARİŞ*%0A*Müşteri:* ${ad}%0A*Adres:* ${adres}%0A*Ürünler:* ${urunDetay}%0A*Toplam:* ${toplam} TL`;
    
    setTimeout(() => {
        window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
    }, 1000);
}
