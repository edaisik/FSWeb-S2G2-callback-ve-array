const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const final2014 = fifaData.filter((mac) => {
  return mac.Year === 2014 && mac.Stage === "Final";
});
// console.log(final2014);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const finalEvSahibi = final2014[0]["Home Team Name"];
// console.log(finalEvSahibi);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const finalDeplasman = final2014[0]["Away Team Name"];
// console.log(finalDeplasman);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const finalEvSahibiGol = final2014[0]["Home Team Goals"];
// console.log(finalEvSahibiGol);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const finalDeplasmanGol = final2014[0]["Away Team Goals"];
// console.log(finalDeplasmanGol);

//(e) 2014 Dünya kupası finali kazananı*/
if (finalEvSahibiGol < finalDeplasmanGol) {
  // console.log(finalDeplasman);
} else {
  // console.log(finalEvSahibi);
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {
  const finaller = dizi.filter((final) => {
    return final.Stage === "Final";
  });
  return finaller;
}
// console.log( Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
  const years = Finaller(fifaData).map((mac) => {
    return mac["Year"];
  });
  return years;
}
// console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, Finaller) {
  /* const kazananlar = Finaller(fifaData).reduce((acc, mac) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      acc.push(mac["Home Team Name"]);
    } else {
      acc.push(mac["Away Team Name"]);
    }
    return acc;
  }, []);
  return kazananlar; */

  const kazananlar = Finaller(fifaData).map((mac) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Name"];
    } else {
      return mac["Away Team Name"];
    }
  });
  return kazananlar;
}
// console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
  let sonuc = [];
  for (let i = 0; i < Yillar(fifaData, Finaller).length; i++) {
    sonuc.push(
      Yillar(fifaData, Finaller)[i] +
        " yılında, " +
        Kazananlar(fifaData, Finaller)[i] +
        " dünya kupasını kazandı!"
    );
  }
  return sonuc;
}
// console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  let toplamGolSayisi = Finaller.reduce(
    (toplamGol, mac) =>
      toplamGol + mac["Home Team Goals"] + mac["Away Team Goals"],
    0
  );

  return (toplamGolSayisi / Finaller.length).toFixed(2);
}
// console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

let kısaltmalar = Finaller(fifaData).reduce((total, mac) => {
  if (!total.includes(mac["Home Team Initials"])) {
    total.push(mac["Home Team Initials"]);
  }
  if (!total.includes(mac["Away Team Initials"])) {
    total.push(mac["Away Team Initials"]);
  }
  return total;
}, []);
function UlkelerinKazanmaSayilari(fifaData, kısaltmalar) {
  let result = Finaller(fifaData).reduce((total, mac) => {
    let kazanan;
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      kazanan = mac["Home Team Initials"];
    } else {
      kazanan = mac["Away Team Initials"];
    }
    if (total[kazanan] == undefined) {
      total[kazanan] = 1;
    } else {
      total[kazanan] += 1;
    }
    return total;
  }, {});
  return result;
}
console.log(UlkelerinKazanmaSayilari(fifaData, kısaltmalar));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
