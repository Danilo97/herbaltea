$(document).ready(function(){

    var error="neuspesno!";
    $.ajax({
        url:"assets/dataJson/menu.json",
        method:"get",
        dataType:"json",
        success: function(meni){
            let ispis="";
            for(var m of meni){
                ispis+=`<li><a href="${m.href}">${m.text}</a></li>`;
            }
            $("#menu").html(ispis);
            $("#menuSide").html(ispis);
        }
    })
    $.ajax({
        url:"assets/dataJson/menuFooter.json",
        method:"get",
        dataType:"json",
        success: function(meniFooter){
            let ispis="";
            for(var m of meniFooter){
                ispis+=`<li><a href="${m.href}">${m.text}</a></li>`;
            }
            $("#footerMenu").html(ispis);
        }
    })
    $.ajax({
        url:"assets/dataJson/partneri.json",
        method:"get",
        dataType:"json",
        success: function(partneri){
            let ispisPartneri="";
            for(var p of partneri){
                ispisPartneri+=`
                <div class="slickPartneri d-flex justify-content-center">
                <img src="${p.slika.src}" alt="${p.slika.alt}"/>
                </div>
                `;
            }
            $("#partneri").html(ispisPartneri);
            //SLICK SLIDER!!!!
            slick();
            //SLICK SLIDER END!!!!
            
        }
    })

    $.ajax({
        url:"assets/dataJson/products.json",
        method:"get",
        dataType:"json",
        success: function(proizvodi){
            ispisiProizvode(proizvodi);
        },
        error:function(error){
            console.log(error);
        }
    })

    $.ajax({
        url:"assets/dataJson/products.json",
        method:"get",
        dataType:"json",
        success: function(proizvodi){
            filtriraj(proizvodi);
        },
        error:function(error){
            console.log(error);
        }
    })
    //CART 
    $(document).on("click",".pokupiData",cart);
    
    //KOMBINOVANJE FILTER I SORT
    $(document).on("change","#Kategorija",kombFilterSort);
    $(document).on("change","#cena",kombFilterSort);
    $(document).on("change","#nazivSort",kombFilterSort);


    // SEARCH
    //$(document).on("keyup","#search",pretrazi);

    //SUBSCRIBE
    $(document).on("click","#dugmeSub",subscribe);

   var menu = $("#mainMenu").position()
   //console.log(menu)
   
    $("#mainMenu").hide();
    $(window).scroll(function(){

      const scroll = $(this).scrollTop();

      if(scroll > 50) {

          $('#mainMenu').fadeIn();
      } else {
          
          $('#mainMenu').fadeOut();
      }

  })

  //SIDE MENU

  $('#burgerMenu').click(function(){
    $('#mainMenuSide').toggleClass('mainNavSide1') 
    $('#mainMenuSide li a').click(function(){
      $('#mainMenuSide').removeClass('mainNavSide1')
    })
  })

  //FORMA PROVERA!!!
  
  $("#ime").blur(imeProvera);
  $("#prezime").blur(prezimeProvera);
  $("#email").blur(emailProvera);
  $("#textarea").blur(textareaProvera);
  $("#dugme").click(dugmeProvera);

  //FORMA PROVERA END!!!
})

/*----------------PROVERA FORME START!!!!--------------*/

  /*--------Na Blur START--------*/
    function imeProvera(){   
        var imeReg=/^[A-Z][a-z]{1,20}(\s[A-Z][a-z]+){0,1}$/;
        var imeVr= $("#ime").val();
        if(imeReg.test(imeVr)){
            $("#ime").css("border","2px solid #77B864");
        }
        else{
            $("#ime").css("border","2px solid #f64b3c");
        }     
    }

    function prezimeProvera(){
        var prezimeReg=/^[A-Z][a-z]{1,20}(\s[A-Z][a-z]+){0,1}$/;
        var prezimeVr= $("#prezime").val();
        if(prezimeReg.test(prezimeVr)){
            $("#prezime").css("border","2px solid #77B864");
        }
        else{
            $("#prezime").css("border","2px solid #f64b3c");
        }
    }

    function emailProvera(){
            var EmailReg=/^[a-z][a-z\d\_\-\.]+\@[a-z]{3,10}\.[a-z]{2,3}$/
            var emailVr= $("#email").val();
            if(EmailReg.test(emailVr)){
                $("#email").css("border","2px solid #77B864");
            }
            else{
                $("#email").css("border","2px solid #f64b3c");
            }
    }
    function textareaProvera(){
            var textAreaVr= $("#textarea").val();
            if(textAreaVr.length<20){
                $("#textarea").css("border","2px solid #f64b3c");
            }
            else{
                $("#textarea").css("border","2px solid #77B864");
            }
    }
    
  /*--------Na Blur END--------*/

  /*---------Na Click START----------*/
    function dugmeProvera(){
        var greska=false;

        var imeReg=/^[A-Z][a-z]{1,20}(\s[A-Z][a-z]+){0,1}$/;
        var imeVr= $("#ime").val();
        if(imeReg.test(imeVr)){
            $("#ime").css("border","2px solid #77B864");
        }
        else{
            $("#ime").css("border","2px solid #f64b3c");
            greska=true;
        } 
        
        var prezimeReg=/^[A-Z][a-z]{1,20}(\s[A-Z][a-z]+){0,1}$/;
        var prezimeVr= $("#prezime").val();
        if(prezimeReg.test(prezimeVr)){
            $("#prezime").css("border","2px solid #77B864");
        }
        else{
            $("#prezime").css("border","2px solid #f64b3c");
            greska=true;
        }

        var EmailReg=/^[a-z][a-z\d\_\-\.]+\@[a-z]{3,10}\.[a-z]{2,3}$/
        var emailVr= $("#email").val();
        if(EmailReg.test(emailVr)){
            $("#email").css("border","2px solid #77B864");
        }
        else{
            $("#email").css("border","2px solid #f64b3c");
            greska=true;
        }

        var textAreaVr= $("#textarea").val();
        if(textAreaVr.length<20){
            $("#textarea").css("border","2px solid #f64b3c");
            greska=true;
        }
        else{
            $("#textarea").css("border","2px solid #77B864");
            
        }

        if(!greska){
            alert("Uspesno ste poslali Mail! Javicemo Vam se u najkracem mogucem roku!");
            document.getElementById("forma").reset();
            $("#ime").css("border","2px solid #3B6B57");
            $("#prezime").css("border","2px solid #3B6B57");
            $("#email").css("border","2px solid #3B6B57");
            $("#textarea").css("border","2px solid #3B6B57");
        }
        else{
            alert("Niste uspesno popunili Formu za slanje!");
        }
    }
  /*---------Na Click END----------*/

  /*----------------PROVERA FORME END!!!!--------------*/

function ispisiProizvode(proizvodi){
    let ispis = "";
    for(var p of proizvodi){
        ispis+= 
        `
        <div class="col-lg-4 col-md-6 col-sm-12 prodCol text-center">
        <figure>
            <img class="img-fluid" src="${p.slika.src}" alt="${p.slika.alt}"/>
        </figure>
        <h3>${p.naziv}</h3>
        <p>${p.opis}</p>
        `;if(p.cena.popust){ispis+=`<p class="cena"><label>${p.cena.trenutna} din</label> <del>${p.cena.stara} din</del></p>`} else {ispis+=`<p class="cena"><label>${p.cena.trenutna} din</label> </p> `}` `
        ispis+=`
        <button class="buttonLink pokupiData" data-id="${p.id}">Poruci</button>
        </div>
        `;
    }
    $("#products").html(ispis);

    
}


// ---------------------- CART START!!! ------------------------------------------
function cart(){

    let prodId = $(this).data("id"); 
    //console.log(prodId);  
    var nizId;
    if(localStorage.getItem("product")){
        //alert("usli smo!");
        nizId = JSON.parse(localStorage.getItem("product")) || localStorage.getItem('product');
    }
    else{
        nizId=[];
    }
    //console.log(nizId);
    $.ajax({
        url:"assets/dataJson/products.json",
        method:"get",
        dataType:"json",
        success: function(proizvodi){
            if(localStorage.getItem("product")){
                for(let p of nizId){
                    if(prodId==p.id){
                        alert("Proizvod je vec ubacen u korpu.");
                        return;
                    }
                    
                }
            }
            var ispis ="";
            for(let l of proizvodi){
                if(l.id==prodId){
                    nizId.push(l);
                    localStorage.setItem("product",JSON.stringify(nizId));
                    nizId = JSON.parse(localStorage.getItem("product"));
                    alert("proizvod je dodat!");
                }
            }
            
        },
        error:function(error){
            console.log(error);
        }
    })
   
}

// --------------------------------- CART END!!!! --------------------------------------------

//-----------KOMBINACIJA FILTER I SORT START!!----------
    function kombFilterSort(){
        //e.preventDefault();
        var filterVr= $("#Kategorija").val();
        // var nazivSortVr= $("#nazivSort").val();
        var cenaVr= $("#cena").val();
        // console.log(filterVr);
        // console.log(nazivSortVr);
        // console.log(cenaVr);
        $.ajax({
            url:"assets/dataJson/products.json",
            method:"get",
            dataType:"json",
            success: function(proizvodi){
                    //console.log(izabraniCaj);
                    var filtriraniProizvodi = [];
                    if(filterVr != 'izaberi' ){
                        filtriraniProizvodi = proizvodi.filter(caj => caj.kategorija == filterVr)
                        if(cenaVr != 'izaberi'){
                            //alert("ovde radi") radi ovo
                            if(cenaVr =='rast'){
                                //alert("ovde radi") radi ovo
                                filtriraniProizvodi.sort((a,b)=>{
                                    if(a.cena.trenutna>b.cena.trenutna){
                                        return -1;
                                    }
                                    else if(a.cena.trenutna<b.cena.trenutna){
                                        return 1;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
                            }
                            //console.log(filtriraniProizvodi);
                            if(cenaVr =='pad'){
                                filtriraniProizvodi.sort((a,b)=>{
                                    if(a.cena.trenutna>b.cena.trenutna){
                                        return 1;
                                    }
                                    else if(a.cena.trenutna<b.cena.trenutna){
                                        return -1;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
                            }
                            if(cenaVr =='rastNaziv'){
                                filtriraniProizvodi.sort((a,b)=>{
                                    if(a.naziv>b.naziv){
                                        return 1;
                                    }
                                    else if(a.naziv<b.naziv){
                                        return -1;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
                            }
                            if(cenaVr =='padNaziv'){
                                filtriraniProizvodi.sort((a,b)=>{
                                    if(a.naziv>b.naziv){
                                        return -1;
                                    }
                                    else if(a.naziv<b.naziv){
                                        return 1;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
                            }
                        
                        }
                        
                        // localStorage.setItem("kategorija",JSON.stringify(izabraniCaj))
                        // var vrKatLS = JSON.parse(localStorage.getItem("kategorija"));
                        // alert(vrKatLS);
                        ispisiProizvode(filtriraniProizvodi);

                    }
                    else{
                        //alert("uslo u else")
                        if(cenaVr =='rast'){
                            proizvodi.sort((a,b)=>{
                                if(a.cena.trenutna>b.cena.trenutna){
                                    return -1;
                                }
                                else if(a.cena.trenutna<b.cena.trenutna){
                                    return 1;
                                }
                                else{
                                    return 0;
                                }
                            })
                            
                        }
                        //console.log(proizvodi);
                        if(cenaVr =='pad'){
                            proizvodi.sort((a,b)=>{
                                if(a.cena.trenutna>b.cena.trenutna){
                                    return 1;
                                }
                                else if(a.cena.trenutna<b.cena.trenutna){
                                    return -1;
                                }
                                else{
                                    return 0;
                                }
                            })
                        }
                        if(cenaVr =='rastNaziv'){
                            proizvodi.sort((a,b)=>{
                                if(a.naziv>b.naziv){
                                    return 1;
                                }
                                else if(a.naziv<b.naziv){
                                    return -1;
                                }
                                else{
                                    return 0;
                                }
                            })
                        }
                        if(cenaVr =='padNaziv'){
                            proizvodi.sort((a,b)=>{
                                if(a.naziv>b.naziv){
                                    return -1;
                                }
                                else if(a.naziv<b.naziv){
                                    return 1;
                                }
                                else{
                                    return 0;
                                }
                            })
                        }
                        ispisiProizvode(proizvodi);
                    }
                    
                
            },
            error:function(error){
                console.log(error);
            }
        })
    }
//------------KOMBINACIJA FILTER I SORT END!!!-----------

// PRETRAZI
function pretrazi(){
    var vrUnosa = $("#search").val().toUpperCase();
    //console.log(vrUnosa);
    $.ajax({
        url:"assets/dataJson/products.json",
        method:"get",
        dataType:"json",
        success: function(proizvodi){
            for(var s of proizvodi){
                var proizvod = s.naziv;
                //console.log(proizvod);
                if(proizvod.toUpperCase().indexOf(vrUnosa)>-1){
                    filtriraj(proizvodi);
                }
                else{
                    ispisiProizvode(proizvodi)
                }
            }
        },
        error:function(error){
            console.log(error);
        }
    })
}

//----------SBUSCRIBE!!!----------
function subscribe(){
     var vrSbuEmail = $("#emailSub").val();
     var emailSub;
     var ispisSub="";
     var regexMailSub = /^[a-z][a-z\d\_\-\.]+\@[a-z]{3,10}\.[a-z]{2,3}$/;
     if(regexMailSub.test(vrSbuEmail)){
        if(localStorage){
            localStorage.setItem("emailSub",JSON.stringify(vrSbuEmail));
            emailSub = JSON.parse(localStorage.getItem("emailSub"));
            ispisSub+=`<p> Uneti ste u nasu mailing listu, hvala vam na poverenju! Mail koji je unet je </br> ${emailSub} <i class="far fa-check-circle checkSub"></i>`;
        }
        $("#subscribeIspis").html(ispisSub);
     }
     else{
        ispisSub+=`<p> Uneli ste pogresan format email adrese <i class="far fa-times-circle checkSubX"></i>`;
     }
     $("#subscribeIspis").html(ispisSub);
      
}
//------------SBUSCRIBE END!!!------------




function filtriraj(proizvodi){
    $("#Kategorija").change(function(){
        var izabraniCaj = $("#Kategorija").val()
        var filtriraniProizvodi = [];
        if(izabraniCaj != 'izaberi' ){
            filtriraniProizvodi = proizvodi.filter(caj => caj.kategorija == izabraniCaj)
            ispisiProizvode(filtriraniProizvodi);
        }
        else {
            ispisiProizvode(proizvodi);
        }
        
        
    })
    
}

$("#cena").change(function(){
        var cenaVal = $("#cena").val();

        $.ajax({
            url:"assets/dataJson/products.json",
            method:"get",
            dataType:"json",
            success: function(proizvodi){
                let sortProizvodi = proizvodi;

                if(cenaVal == 'rast' ){
                    proizvodi.sort((a,b) => {
                        if(a.cena.trenutna > b.cena.trenutna)
                        return -1;
                        else if(a.cena.trenutna < b.cena.trenutna)
                        return 1;
                        else
                        return 0;
                    })
                    ispisiProizvode(sortProizvodi);
                }

                else if(cenaVal == 'pad') {
                    proizvodi.sort((a,b) => {
                        if(a.cena.trenutna > b.cena.trenutna)
                        return 1;
                        else if(a.cena.trenutna < b.cena.trenutna)
                        return -1;
                        else
                        return 0;
                    })
                    ispisiProizvode(sortProizvodi);
                }

                ispisiProizvode(sortProizvodi);
            },
            error:function(error){
                console.log(error);
            }
        })   
    })
    $("#nazivSort").change(function(){
        var NazivVal = $("#nazivSort").val();

        $.ajax({
            url:"assets/dataJson/products.json",
            method:"get",
            dataType:"json",
            success: function(proizvodi){
                let sortProizvodi = proizvodi;

                if(NazivVal == 'rast' ){
                    proizvodi.sort((a,b) => {
                        if(a.naziv > b.naziv)
                        return 1;
                        else if(a.naziv < b.naziv)
                        return -1;
                        else
                        return 0;
                    })
                    ispisiProizvode(sortProizvodi);
                }

                else if(NazivVal == 'pad') {
                    proizvodi.sort((a,b) => {
                        if(a.naziv > b.naziv)
                        return -1;
                        else if(a.naziv < b.naziv)
                        return 1;
                        else
                        return 0;
                    })
                    ispisiProizvode(sortProizvodi);
                }

                ispisiProizvode(sortProizvodi);
            },
            error:function(error){
                console.log(error);
            }
        })   
    })

    //SLICK SLIDER
    function slick(){
        $('.partneriSlick').slick({
            
            slidesToShow: 3,
        
            slidesToScroll: 3,
        
            autoplay: true,
        
            autoplaySpeed: 1500,
        
            arrows:false,

            responsive: [
               
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                
              ]
            
        })
    }