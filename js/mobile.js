var URL_AJAX = "https://4pay.com/widget/ajax_mobile.jsp";
//var URL_AJAX = "ajax_mobile.jsp";
//var URL_AJAX = "http://localhost:8080/widget/ajax_mobile.jsp";
$(function() {
	var backButtonFunction = goHomePage;

	$('#clickPay').click(function() {
		$("#list").hide(function(){
			$("#setup").show();
		});
	});

	$("#back_button").click(function() {
		$(this).hide();
		$("#header H1").text("4PAY");	
		goHomePage();
	});

	$("#button_home").click(function() {
		$(this).hide();
		$("#back_button").hide();
		goHomePage();
	});

	$('#closePanel').click(function() {
		$( "#mypanel" ).panel( "close" );
	});
	
	$("#beer").click(function() {
		$( "#mypanel" ).panel( "open" );
	});
	$("#chat").click(function() {
		$("#body").animate({width:'toggle'},350);
	});
	
	function goHomePage(){
		$("#button_home").hide();
		$("#body").empty();
		
		ajxaLoaderShow();
		$.getJSON(URL_AJAX,{action:"getBalance" }, function(json){
			$("#body").append("<div id='div_home'>" + 
					"<h3>Ваш баланс</h3>" +
					"<h1 id='balance_home'>" + json.balance + "</h1>" +
					"<a id='clickPlugin' href='#' data-role='button' data-theme='b'>Plugin-Test</a>" +
					"<a id='clickOut' href='#' data-role='button' data-theme='b'>Вывести</a>" + 
					"<a id='clickPayment' href='#' data-role='button' data-theme='e'>Оплатить</a>" + 
					"<a id='clickTransfer' href='#' data-role='button' data-theme='e'>Перевести</a>" + 
					"<a id='clickReport' href='#' data-role='button' data-theme='c'>Отчет</a>" + 
					"</div>").trigger("create");
				
				$("#balance_home").click(function(){
					ajxaLoaderShow();
					$.getJSON(URL_AJAX,{action:"getBalance" }, function(json){
						$("#balance_home").text(json.balance);
						ajxaLoaderHide();
					});
				});

				$("#clickReport").click(function(){
					getTransactionList();
				});
				$("#clickPayment").click(function(){
					goPaymentGroupList();
				});
				$("#clickOut").click(function(){
					$("#body").animate({width:'toggle'},350,function(){
//						$("#body").empty();
//						$("#body").append("TEST");
//						$("#body").animate({width:'toggle'},350);
//						$("#body").show("slide");
					});
				});

				$("#button_logout").show();

				$("#clickPlugin").click(function(){
					alert("plugin Start");
					cordova.exec(
						function(winParam){ 
							alert("SUCCES TEST!" + winParam); 
						}, 
						function(error){ 
							alert("ERROR TEST!"); 
						}, 
						"Echo", 
						"echo",
						["arturPlugin WIN!"]
					);
					alert("plugin Stop");
				});


				ajxaLoaderHide();
		});
	}
	
	function goPaymentGroupList(){
		$("#button_logout").hide();
		$("#header H1").text("Оплата");	
		$("#body").empty();

		$.getJSON(URL_AJAX,{action:"getPaymentGroupList" }, function(json){
			var str = "<ul data-role='listview' data-inset='false'>";
			var groupList = json.groupList;
			for ( var i in groupList) {
				var group = groupList[i];
				str = str + "<li><a class='pay_group_text' href='#' data-transition='slide'><img  src='" + group.icon + "' alt='' class='ui-li-icon ui-corner-none pay_group'>" + group.name + "</a></li>";
			}
			str = str + "</ul>"; 
			
			$("#body").append(str).trigger("create");
		});

		
		$("#back_button").show();
		$("#button_home").show();
	}
	
	function getTransactionList(){
		$("#button_logout").hide();
		$("#header H1").text("Отчеты");	
		$("#body").empty();
		
		ajxaLoaderShow();
		$.getJSON(URL_AJAX,{action:"getTransactionList" }, function(json){
			var body = "<ul data-role='listview' data-inset='false'>";
			var test = 456;
			var intervalArray = json.intervalArray;
			for ( var i in intervalArray) {
				var interval = intervalArray[i];
				body = body + "<li data-role='list-divider'>"+interval.title+"<span class='ui-li-count'>"+interval.count+"</span></li>";
				var transactList = interval.transactList;
				for ( var j in transactList) {
					var transact = transactList[j];
					body = body + 
					"<li class='test' id='1'><a href='#'>" +
	        			"<h2>"+transact.partnerName+"</h2>" +
	        			"<p><strong>" + transact.orderId + "</strong></p>" +
	        			"<p>" + transact.datetime + "</p>" +
	        			"<p class='ui-li-aside'><strong>" + transact.amount + "</strong></p>" +
	        		"</a></li>";
				}				
			}

			body = body + "</ul>";
			$("#body").append( body ).trigger('create');
			
			$("#body .test").click(function(){
				alert(111);
			});

			$("#back_button").show();
			$("#button_home").show();
			ajxaLoaderHide();
		});
		
		$("#body").show();
	}
	
	function ajxaLoaderShow(){
		$.mobile.loading( "show", {
            text: "Loading...",
            textVisible: true,
            theme: "a",
            textonly: false,
            html: ""
		});
	}

	function ajxaLoaderHide(){
		$.mobile.loading( "hide" );
	}
/*
	document.addEventListener("deviceready", function() {
        document.addEventListener("backbutton", function() {
			backButtonFunction();
        }, false);
    }, false);
*/
	function init(){
		goHomePage();
	}


	function Pda4Pay() {
		this.acubTest = function(){
			alert("TEST");
		};
	}

//		alert(1);
//		var pda = new Pda4Pay();
//		pda.acubTest();
//		alert(2);
	init();
	
});



