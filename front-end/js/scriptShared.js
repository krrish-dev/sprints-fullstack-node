

let menuClick=document.getElementById("menuClick")
const Authentication=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQ1NWEyY2ZlOWU1N2ZkMjMzYzc4M2IiLCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiY2FydElkIjoiNjRkNTVhMmNmZTllNTdmZDIzM2M3ODNkIiwiaWF0IjoxNjkxNzA0MDE0fQ.eLeTA0_UlLkUgvPIfC9jJsnI8ZgGeD32o4Kx2dkcxsw`
const Authorization=`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2NmQwMmY0NjNlM2U4MWUwMDYwNTYiLCJ1c2VyUm9sZSI6ImFkbWluIiwiY2FydElkIjoiNjRjNjZkMDJmNDYzZTNlODFlMDA2MDU4IiwiaWF0IjoxNjkxMjc4NDAxfQ.cXGPlgwPS1ziyabataXBVNKD_-R6y2ZisW5FimUh0Ao`
let Search=document.getElementById('Search')
let dropdownSearch=document.getElementById('dropdownSearch')
let products
let SearchResult=[]
let searchValue 
menuClick.addEventListener("click",function(e){
     e.preventDefault();
     let responsiveNav=document.getElementById("responsive-nav")
     responsiveNav.classList.toggle("active");
});


async function  getCart(){
	document.getElementById("cartItems")
	const rawResponse = await fetch('http://localhost:3000/cart', {
		method: 'GET',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  'Authentication': Authentication,
		  'Authorization':Authorization
		},

	  });
	  const content = await rawResponse.json();
	  let item=content.result.products
		console.log(item);
	
	if(content.result.products.length ==0){
		
		document.getElementById("cartItems").innerHTML="<h1>no items added</h1>";
	}else{
		let data=''
		for(let i=0;i<4;i++){
			// let id=item[i]._id
			data+=`
				<h1 style="height:500px">
				${item[1].product.title}
				</h1>
			
`
		}
		document.getElementById("cartItems").innerHTML=data;
	}
}
function cartPopUp(){
	getCart()
	document.getElementById('popUp').style.display="inline-block;";
}

async function addToCartItem(productId){
const rawResponse = await fetch('http://localhost:3000/cartItem', {
	  method: 'POST',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authentication': Authentication,
		'Authorization':Authorization
	  },
	  body: JSON.stringify({
		"product": productId,
		"itemsCount":1
	})
	});
	const content = await rawResponse.json();
  
	console.log(content);
  };


function getSearchValue(){
	searchValue= document.getElementById('searchValue').value
	
}


Search.addEventListener('click',function() {
	location.href =('/Searching.html')
	// 3lashan fi key up fa mardetsh a3'er a7ot
	if(localStorage.getItem('searchResult')){
		localStorage.removeItem('searchResult')
	}
	for(let i =0 ;i<products.length ;i++){
		if(dropdownSearch.value==0&&searchValue!=''){
			if(products[i].title.toLowerCase().includes(searchValue.toLowerCase()))
				{SearchResult.push(products[i])
				}
		}else{
			if(products[i].category.toLowerCase().includes(searchValue.toLowerCase()))
			{SearchResult.push(products[i])
			}
		}
	}
	localStorage.setItem('searchResult',JSON.stringify(SearchResult) )

})
async function getProducts() {
	let displayProducts=document.getElementById('displayProducts')
	const response = await fetch("http://localhost:3000/product");
	let getProducts = await response.json();
	products=getProducts.result
	let data=''
	
	for(let i=0;i<4;i++){
		let id=products[i]._id
		data+=`<div style="padding: 0px 5px; " class="col-md-2">
		<div class="product ">
			<div class="product-img">
				<img src="${products[i].img}" style="height:319.5px" alt="">
				<div class="product-label">
					<span class="sale">-30%</span>
					<span class="new">NEW</span>
				</div>
			</div>
			<div class="product-body">
				<p class="product-category">${products[i].category}</p>
				<h3 class="product-name"><a href="#">${products[i].title}</a></h3>
				<h4 class="product-price">$ ${products[i].price}</h4>
				<div class="product-rating">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
				</div>
				<div class="product-btns">
			
					<button  onclick="addTowishList('${id}')" type="button" class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
					<button onclick="location.href = '/productSearch/${id}.html' class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">View</span></button>
				</div>
			</div>
			<div class="add-to-cart">
				<button onclick="addToCart('${id}')"   class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
			</div>
		</div>
	</div>`
	}
	document.getElementById('displayProducts').innerHTML=data

}
getProducts();
let listOfWishList = []
function addTowishList(id){
	 let findingItem= listOfWishList.find(item=>item==id)
	 if(!findingItem){
		listOfWishList.push(id)
		document.getElementById('wishListNumberId').innerHTML=listOfWishList.length
		localStorage.setItem('wishList',JSON.stringify(listOfWishList) )
	 }
	
	console.log(listOfWishList)
}

function addToCart(id){

		addToCartItem(id)
	   document.getElementById('cartNumberId').innerHTML=listOfCart.length
	   localStorage.setItem('cartList',JSON.stringify(listOfCart) )
   
  
}



     
(function($) {
	"use strict"
	

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	var priceInputMax = document.getElementById('price-max'),
			priceInputMin = document.getElementById('price-min');

	priceInputMax.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	priceInputMin.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 999],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 999
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
	}

})(jQuery);

     


