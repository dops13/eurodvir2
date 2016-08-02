$(function() {
	var width = $(window).width();
	var height = $(window).height();
	
	//alert(width+'x'+height);
	
	setTimeout(function(){
		$('.preloader .icon').fadeOut(1000, function(){
			$('.preloader').fadeOut(1000, function(){
				
			});
		});
	}, 1000);
	
	/*main carousel*/
	var main_swiper = new Swiper('.started-slider .swiper-container', {
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
	var news_swiper = new Swiper('.news .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 1,
		//effect: 'fade',
        spaceBetween: 0,
		nextButton: '.news .btn_loadmore',
        prevButton: '.about_slider .prev',
		pagination: '.about_slider .pagination',
		loop: true,
    });
	
	/*proj carousel*/
	var proj_swiper = new Swiper('.about_slider .swiper-container', {
		//autoplay: 3000,
		speed: 750,
		slidesPerView: 1,
		effect: 'fade',
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
		if(proj_swiper.activeIndex<1){
			sw_index = 5;
		}
		$('.about_slider .navs .num strong').text(sw_index);
		$('.about_menu a').removeClass('active');
		$('.about_menu a').eq(sw_index-1).addClass('active');
	});
	
	/*chose flat*/
	$('.choose_btn').click(function(){
		$('html, body').animate({scrollTop: $('#s-flat').offset().top-72}, 500);
		$('.b-area-label-4').click();
		return false;
	});
	$('.area_menu a').click(function(e){
		e.preventDefault();
		if($(this).hasClass('active')){
			var f_tab = $(this).attr('href');
			$('.flats .area').removeClass('active');
			$(f_tab).addClass('active');
			if(f_tab=='#f-detail'){
				var f_subarea = $(this).attr('data-subarea-link');
				if(f_subarea=='p'){
					 $('.area_flats').attr('data-subarea', 'p');
				} else {
					 $('.area_flats').attr('data-subarea', 'o');
				}
			}
			$(this).nextAll('.active').removeClass('active');
			$(this).addClass('active');
		}
		return false;
	});
	$('.area .back').click(function(){
		$('.area_menu a.active:last').prev().click();
		if($(this).attr('data-back-subarea')=='o') {
			$(this).text('Назад к выбору квартиры');
			$(this).attr('data-back-subarea', 'p');
		}
		return false;
	});
	/*section*/
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
			$('.b-area-tooltip .circle').html('<span style="font-size: 11px;">планируется<br/> строительство</span>');
		}
	});
	$('.area_map').mousemove(function(e){
		$('.b-area-tooltip').css({'left': e.pageX-$(this).offset().left+10+'px', 'top': e.pageY-$(this).offset().top+'px'});
	});
	/*plans*/
	$('.b-area-label').click(function(){
		if(!$(this).hasClass('sold')) {
		$('.flats .area').removeClass('active');
		$('#f-plans').addClass('active');
		
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		
		var section_id = $(this).attr('data-section-id');
		$('.area_plans .plans').removeClass('active');
		$('.area_plans .plans_'+section_id).addClass('active;');
		}
		return false;
	});
	$('.area_map area').click(function(){
		$('.b-area-label-'+$(this).attr('data-section-id')).click();
		return false;
	});
	$('.floor_items a').click(function(){
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		$('.floor_info .floor_number').text($(this).text());
		return false;
	});
	$('.plans .btn').click(function(){
		$('.flats .area').removeClass('active');
		$('#f-detail').addClass('active');
		
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		$('.area_menu a').eq(2).addClass('active');
		
		
		$('.area_flats').attr('data-subarea', 'p');
		var flat_id = $(this).attr('data-flat-id');
		$('.area_flats .flat_detail').removeClass('active');
		$('.area_flats .flat_detail_'+flat_id).addClass('active');
		$('.flats-navs .num strong').text($('.area_flats .flat_detail_'+flat_id).index()+1);
	});
	$('.flats-navs .prev').click(function(){
		var prev_flat = $('.area_flats .flat_detail.active').prev();
		if(prev_flat.length){
			$('.area_flats .flat_detail').removeClass('active');
			prev_flat.addClass('active');
			$('.flats-navs .num strong').text(prev_flat.index()+1);
		} else {
			prev_flat = $('.area_flats .flat_detail:last');
			$('.area_flats .flat_detail').removeClass('active');
			prev_flat.addClass('active');
			$('.flats-navs .num strong').text(prev_flat.index()+1);
		}
		return false;
	});
	$('.flats-navs .next').click(function(){
		var next_flat = $('.area_flats .flat_detail.active').next();
		if(next_flat.length){
			$('.area_flats .flat_detail').removeClass('active');
			next_flat.addClass('active');
			$('.flats-navs .num strong').text(next_flat.index()+1);
		} else {
			next_flat = $('.area_flats .flat_detail:first');
			$('.area_flats .flat_detail').removeClass('active');
			next_flat.addClass('active');
			$('.flats-navs .num strong').text(next_flat.index()+1);
		}
		return false;
	});
	$('.plans_floor .prev').click(function(){
		var floor_num = parseInt($('.plans_floor_num').text());
		if(floor_num>1){
			floor_num--;
		}
		$('.plans_floor_num').text(floor_num);
		return false;
	});
	$('.plans_floor .next').click(function(){
		var floor_num = parseInt($('.plans_floor_num').text());
		if(floor_num<10){
			floor_num++;
		}
		$('.plans_floor_num').text(floor_num);
		return false;
	});
	
	/*plan detail*/
	$('#plan_info .btn').click(function(){
		$('.area_menu a').removeClass('active');
		$('.area_menu a').eq(0).addClass('active');
		$('.area_menu a').eq(1).addClass('active');
		$('.area_menu a').eq(2).addClass('active');
		$('.area_menu a').eq(3).addClass('active');
		$('.area_flats').attr('data-subarea', 'o');
		$('.back_to_plans').text('Назад к информации');
		$('.back_to_plans').attr('data-back-subarea', 'o');
		return false;
	});
	$('.plan_detail .btn').hover(
		function(){
			 var plan_icon_id = $(this).attr('data-plan-icon-id');
			 $(this).closest('.flat_detail').find('.item').removeClass('active');
			 $(this).closest('.flat_detail').find('.item_'+plan_icon_id).addClass('active');
		},
		function(){
			 $(this).closest('.flat_detail').find('.item').removeClass('active');
		}
	);
	$('.flat_info .item').hover(
		function(){
			var icon_ind = $(this).attr('data-plan-icon-id');
			$(this).closest('.flat_detail').find('.plan_detail .btn').removeClass('active');
			$(this).closest('.flat_detail').find('.plan_detail .btn[data-plan-icon-id="'+icon_ind+'"]').addClass('active');
		},
		function(){
			$(this).closest('.flat_detail').find('.plan_detail .btn').removeClass('active');
		}
	);

	
	/*map menu*/
	$('.infra_menu a').click(function(){
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		var map_tab = $(this).attr('href');
		$('.infra_tab').removeClass('active');
		$(map_tab).addClass('active');
		return false;
	});
	
	/*styled select*/
	$('select.nice').styler({});
	
	//menu popup
	$('.menu-btn').click(function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#popup_menu').animate({'right': '-500px'}, 500, function(){
				$('#overlay_menu').fadeOut(250, function(){
					$('body').removeClass('p_open');
				});
			});
		} else {
			$(this).addClass('active');
			$('body').addClass('p_open');
			$('#overlay_menu').fadeIn(250, function(){
				$('#popup_menu').animate({'right': '0px'}, 500);
			});
		}
		return false;
	});
	$('#overlay_menu, #popup_menu .close').click(function(){
		$('.menu-btn').removeClass('active');
		$('#popup_menu').animate({'right': '-500px'}, 500, function(){
			$('#overlay_menu').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	$('.popup_menu li a').click(function(){
		var scr_href = $(this).attr('href');
		var scr_top = $(scr_href).offset().top-100;
		$('html, body').animate({scrollTop: scr_top}, 500);
		setTimeout(function(){
			$('.menu-btn').removeClass('active');
			$('#popup_menu').animate({'right': '-500px'}, 500, function(){
				$('#overlay_menu').fadeOut(250, function(){
					$('body').removeClass('p_open');
				});
			});
		}, 500);
		return false;
	});
	
	//map popup
	$('.map-btn').click(function(){
		$('body').addClass('p_open');
		$('#overlay_map').fadeIn(250, function(){
			$('#popup_map').animate({'right': '0px'}, 500);
		});
		return false;
	});
	$('#overlay_map, #popup_map .close').click(function(){
		$('#popup_map').animate({'right': '-720px'}, 500, function(){
			$('#overlay_map').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		});
	});
	
	//ask popup
	$('.btn_ask').click(function(){
		$('menu-btn').removeClass('active');
		$('#popup_menu').animate({'right': '-500px'}, 500, function(){
			$('#overlay_menu').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		});
		$('#popup_map').animate({'right': '-720px'}, 500, function(){
			$('#overlay_map').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		});
		
		$('body').addClass('p_open');
		$('#overlay_ask').fadeIn(250, function(){
			$('#popup_ask').animate({'right': '0px'}, 500);
		});
		return false;
	});
	$('#overlay_ask, #popup_ask .close').click(function(){
		$('#popup_ask').animate({'right': '-700px'}, 500, function(){
			$('#overlay_ask').fadeOut(250, function(){
				$('body').removeClass('p_open');
			});
		});
		
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
	
		/* Gallery */
	$('.album').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
			buildControls: function() {
			  // re-appends controls inside the main container
			  this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			}
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});
	$('.news .btn_viewall').click(function(){
		$('.album a:first').click();
		return false;
	});
	
	// Phone Mask
	$('input[name="phone"]').mask("+9(999) 999-99-99");
});