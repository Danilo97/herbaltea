$(document).ready(function(){

    $(document).on("click",".removeLS",obrisiProduct);
    prikaziProizvodeCart();
})
function prikaziProizvodeCart(){

    let products;
    var ukupnaCena=0;
    if(localStorage.getItem("product")){
        products = JSON.parse(localStorage.getItem("product"));
        
        var ispisCart = `
        <table class="prodTable">
            <thead class="tHead">
                <tr class="tHeadRow">
                    <th>Redni Br.</th>
                    <th>Slika</th>
                    <th>Ime Proizvoda</th>
                    <th>Cena</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;
            brojac=1;
            for(let p of products){
                ispisCart+=`<tr class="prodTr">
                        <td class="prodTd">${brojac++}</td>
                        <td class="prodTd">
                                <img src="${p.slika.src}" style='height:100px' alt="${p.slika.alt}" class="img-responsive">
                        </td>
                        <td class="prodTd">${p.naziv}</td>
                        <td class="prodTd">$${p.cena.trenutna}</td>
                        <td class="prodTd">
                            <div class="prodTd">
                                <div class="dugmeRemove"><button class="removeLS" data-ukloniId="${p.id}">Ukloni</button> </div>
                            </div>
                        </td>
                    </tr>`;
                    ukupnaCena+=p.cena.trenutna;
            }
            ispisCart += `</table>`;
            $("#prodTabela").html(ispisCart);
            console.log(ukupnaCena);
            
    }
    else{
        alert("ne radi IF");
        products = "Nemate trenutno prozivoda u korpi...";
    } 
    
}
function obrisiProduct(){ 
    
    var vrUkloni = $(this).data("ukloniid");
   
    var nizCart= JSON.parse(localStorage.getItem("product"));
    
    for(let l of nizCart){
        if(vrUkloni==l.id){
            const prodId = nizCart.indexOf(l);
            var obrisiProd = nizCart.splice(prodId,1);
            console.log(nizCart)
            localStorage.setItem("product",JSON.stringify(nizCart));
            $(this).parent().parent().parent().parent().remove();
        }
    }
}