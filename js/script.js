$(function() {
	var width = $(window).width();
	var height = $(window).height();
	
	//alert(width+'x'+height);
	
	setTimeout(function(){
		$('.preloader .icon').fadeOut(1000, function(){
			$('.preloader').fadeOut(1000, function(){
				/*css animated*/
				new WOW().init();
				wow2 = new WOW(
					{
						boxClass:     'wow2',
						animateClass: 'animated',
						offset:       0,
						mobile:       false,
						live:         true
					}
				)
				wow2.init();
			});
		});
	}, 1000);
	
	/*proj carousel*/
	var proj_swiper = new Swiper('.started-slider .swiper-container', {
		autoplay: 3000,
		speed: 2000,
		slidesPerView: 1,
        spaceBetween: 0,
		scrollbarHide: false,
		scrollbarDraggable: false,
		scrollbarSnapOnRelease: false,
		loop: true,
		effect: 'fade'
    });
	
	/*proj carousel*/
	var proj_swiper = new Swiper('.about_slider .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 1,
        spaceBetween: 0,
		nextButton: '.about_slider .next',
        prevButton: '.about_slider .prev',
		pagination: '.about_slider .pagination',
		loop: true,
    });
	$('.about_menu a').click(function(){
		 $(this).parent().find('a').removeClass('active');
		 $(this).addClass('active');
		 var about_index = $(this).index()+1;
		 proj_swiper.slideTo(about_index, 750, function(){});
		 return false;
	});
	proj_swiper.on('slideChangeStart', function () {
		var sw_index = proj_swiper.activeIndex;
		if(proj_swiper.activeIndex>5){
			sw_index = 1;
		}
		$('.about_slider .navs .num strong').text(sw_index);
		$('.about_menu a').removeClass('active');
		$('.about_menu a').eq(sw_index-1).addClass('active');
	});
	
	/*chose flat*/
	$('.choose_btn').click(function(){
		$('html, body').animate({scrollTop: $('#s-flat').offset().top-72}, 500);
		return false;
	});
	$('.area_menu a').click(function(){
		/*
		var f_tab = $(this).attr('href');
		$('.m_flat .area').removeClass('active');
		$(f_tab).addClass('active');
		if(f_tab=='#f-flats'){
			var f_subarea = $(this).attr('data-subarea-link');
			if(f_subarea=='d'){
				 $('.area_flats').attr('data-subarea', 'd');
			} else {
				 $('.area_flats').attr('data-subarea', 'p');
			}
		}
		
		$('.area_menu a').removeClass('active');
		$(this).addClass('active');
		$('.area_active').css('left', $(this).position().left+'px');
		*/
		return false;
	});
	$('.floor_items a').click(function(){
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		$('.floor_info .floor_number').text($(this).text());
		return false;
	});
	$('.b-area-label, .area_map area').click(function(){
		return false;
		$('.m_flat .area').removeClass('active');
		$('#f-flats').addClass('active');
		
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		
		$('.area_flats').attr('data-subarea', 'p');
		var section_id = $(this).attr('data-section-id');
		$('.area_flats .plans').removeClass('active');
		$('.area_flats .plans_'+section_id).addClass('active;');
		return false;
	});
	$('.plans_flat .btn').click(function(){
		$('.m_flat .area').removeClass('active');
		$('#f-flats').addClass('active');
		
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(2).addClass('active');
		$('.area_active').css('left', $('.area_menu a').eq(2).position().left+'px');
		
		$('.area_flats').attr('data-subarea', 'd');
		var flat_id = $(this).parent().attr('data-flat-id');
		$('.area_flats .flat_detail').removeClass('active');
		$('.area_flats .flat_detail_'+flat_id).addClass('active;');
		var flat_number = $(this).parent().attr('data-flat-number');
		$('.flat_info .flat_number').text(flat_number);
	});
	$('.plans_flat .btn').hover(function(){
		var flat_number = $(this).parent().attr('data-flat-number');
		$('.flat_info .flat_number').text(flat_number);
	});
	$('.area_flats').on('click', '.back', function(){
		var back_id = $('#f-flats').attr('data-subarea');
		if(back_id=='d'){
			$('.m_flat .area').removeClass('active');
			$('#f-flats').addClass('active');
		
			$('.area_flats').attr('data-subarea', 'p');
		
			$('.area_menu a').removeClass('active');
			$('.area_menu a').eq(1).addClass('active');
			$('.area_active').css('left', $('.area_menu a').eq(1).position().left+'px');
		} else {
			$('.m_flat .area').removeClass('active');
			$('#f-sections').addClass('active');
			
			$('.area_flats').attr('data-subarea', 'p');
			
			$('.area_menu a').removeClass('active');
			$('.area_menu a').eq(0).addClass('active');
			$('.area_active').css('left', $('.area_menu a').eq(0).position().left+'px');
		}
		
		return false;
	});
	$('.flat_detail .btn').hover(
		function(){
			 var plan_icon_id = $(this).attr('data-plan-icon-id');
			 $(this).closest('.flat_detail').find('.item').removeClass('active');
			 $(this).closest('.flat_detail').find('.item_'+plan_icon_id).addClass('active');
		},
		function(){
			 $(this).closest('.flat_detail').find('.item').removeClass('active');
		}
	);
	
	$('.area_map area, .b-area-label').hover(
		function(){
			 var area_index = $(this).attr('data-section-id');
			 $('.b-area-hover').removeClass('active');
			 $('.b-area-hover-'+area_index).addClass('active');
			 $('.b-area-label').removeClass('active');
			 $('.b-area-label-'+area_index).addClass('active');
			 $('.b-area-tooltip').show();
		},
		function(){
			 $('.b-area-hover').removeClass('active');
			 $('.b-area-label').removeClass('active');
			 $('.b-area-tooltip').hide();
		}
	);
	
	$('.area_map area').hover(function(){
		if($(this).attr('data-section-count')!='0'){
			$('.b-area-tooltip .circle').html('<span class="num">'+$(this).attr('data-section-count')+'</span><br/>Квартир');
		} else {
			$('.b-area-tooltip .circle').html('усі<br/> квартири<br/> продані');
		}
	});
	
	$('.area_map').mousemove(function(e){
		$('.b-area-tooltip').css({'left': e.pageX-$(this).offset().left+30+'px', 'top': e.pageY-$(this).offset().top+'px'});
	});
	
	/*map menu*/
	$('.infra_menu a').click(function(){
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	/*styled select*/
	$('select.nice').styler({});
	
	//menu popup
	$('.menu-btn').click(function(){
		return false;
		if($(this).hasClass('active')) {
			$(this).css({'right': '0px'});
			$(this).removeClass('active');
			setTimeout(function(){
				$('#overlay_menu').fadeOut(250, function(){
					$('body').removeClass('p_open');
				});
			}, 500);
			$('#popup_menu').removeClass('open');
		} else {
			var brp = 0;
			brp = 30 - (width-1100)/2;
			$(this).css({'right': brp+'px'});
			$(this).addClass('active');
			$('body').addClass('p_open');
			$('#overlay_menu').fadeIn(250);
			$('#popup_menu').addClass('open');
		}
		return false;
	});
	$('#overlay_menu').click(function(){
		$('.menu-btn').click();
	});
	$('.pop_menu a').click(function(){
		var scr_href = $(this).attr('href');
		var scr_top = 0;
		if(scr_href!='#s-main'){
			scr_top = $(scr_href).find('.title').offset().top-100;
		}
		$('html, body').animate({scrollTop: scr_top}, 500);
		setTimeout(function(){
			$('.menu-btn').click();
		}, 500);
		return false;
	});
	
	//map popup
	$('.map-btn').click(function(){
		$('body').addClass('p_open');
		$('#overlay_map').fadeIn(250);
		$('#popup_map').addClass('open');
		return false;
	});
	$('#overlay_map, #popup_map .close').click(function(){
		setTimeout(function(){
			$('#overlay_map').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		}, 500);
		$('#popup_map').removeClass('open');
	});
	
	//order popup
	$('.order-btn').click(function(){
		$('body').addClass('p_open');
		$('#overlay_order').fadeIn(250);
		$('#popup_order').addClass('open');
		return false;
	});
	$('#overlay_order, #popup_order .close').click(function(){
		setTimeout(function(){
			$('#overlay_order').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		}, 500);
		$('#popup_order').removeClass('open');
	});
		
	//thanks close popup
	$('#popup_thanks .close').click(function(){
		setTimeout(function(){
			$('#overlay_order').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
			$('.popup-order .fields input, .popup-order .fields textarea').val('');
		}, 500);
		$('#popup_order').removeClass('open');
		$('#popup_thanks').removeClass('open');
		return false;
	});
	
	//contact validate
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$('#popup_thanks').addClass('open');
			setTimeout(function(){
				$('#popup_thanks .close').click();
			}, 4000);
			
			return false;
		}
	});
	
	/*menu filled*/
	if($(window).scrollTop()>100){
		$('header').addClass('filled');
	} else {
		$('header').removeClass('filled');
	}
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$('header').addClass('filled');
		} else {
			$('header').removeClass('filled');
		}
	});
	
	/*v-line animate*/
	var half = height/2;
	var y_height = 0;
	var start_ytop = $('.section.started .btn').offset().top+48;
	var ffgroup = $('.about .title').offset().top;
	$('.fline-y').css({'top': start_ytop+'px'});
	$('.fline-g').css({'top': ffgroup+'px'});
	$(window).scroll(function(){
		 y_height = $(window).scrollTop()*0.75;
		 
		 if($(window).scrollTop()<ffgroup){
			 $('.fline-y').css({'height': y_height});
		 }
		 
		 if($(window).scrollTop()>0) {
			 $('.started .btn .round').fadeIn(500);
		 } else {
			 $('.started .btn .round').fadeOut(500);
		 }
		 
		 if($(window).scrollTop()>ffgroup){
			 $('.fline-g').addClass('active');
			 $('.fline-g').css({'height': $(window).scrollTop()+half-ffgroup});
		 } else {
			 $('.fline-g').removeClass('active');
			 $('.fline-g').css({'height': $(window).scrollTop()+half-ffgroup});
		 }
	});
	
	// Phone Mask
	$('input[name="phone"]').mask("+9(999) 999-99-99");
});