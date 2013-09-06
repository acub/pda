var URL_AJAX = "https://4pay.com/widget/mobile/ajax_mobile.jsp";
//var URL_AJAX = "ajax_mobile.jsp";
//var URL_AJAX = "http://localhost:8080/widget/ajax_mobile.jsp";
$(function() {
	var backButtonFunction = goHomePage;

	$('#bshow').click(function() {
		$.getJSON("ajax_mobile.jsp",{action:"getTransactionDetail", transactId: "transactId", SID : "global_var.SID" }, function(json){
			$("#themes").show();
		});

	});

	$('#bhide').click(function() { 
		$("#themes").hide();
	});

	$('#option').click(function() {
		$("#setup").show();
	});

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
	
	$('#clickAdd').click(function() {
		$("#setup").hide(function(){
			getTransactionList();
		});
	});

	function goHomePage(){
		$("#button_home").hide();
		$("#body").empty();
		
		startLoad();
		$.getJSON(URL_AJAX,{action:"getBalance" }, function(json){
			$("#body").append("<div id='div_home'>" + 
					"<h3>Ваш баланс</h3>" +
					"<h1 id='balance_home'>" + json.balance + "</h1>" +
					"<a href='#' data-role='button' data-theme='b'>Пополнить</a>" +
					"<a href='#' data-role='button' data-theme='b'>Вывести</a>" + 
					"<a id='clickPayment' href='#' data-role='button' data-theme='e'>Оплатить</a>" + 
					"<a href='#' data-role='button' data-theme='e'>Перевести</a>" + 
					"<a id='clickReport' href='#' data-role='button' data-theme='c'>Отчет</a>" + 
					"</div>").trigger("create");
				
				$("#balance_home").click(function(){
					startLoad();
					$.getJSON(URL_AJAX,{action:"getBalance" }, function(json){
						$("#balance_home").text(json.balance);
						stopLoad();
					});
				});

				$("#clickReport").click(function(){
					getTransactionList();
				});
				$("#clickPayment").click(function(){
					goPaymentGroupList();
				});
				$("#button_logout").show();
				
				stopLoad();
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
				str = str + "<li><a class='pay_group_text' href='payments.html' data-transition='slide'><img  src='" + group.icon + "' alt='' class='ui-li-icon ui-corner-none pay_group'>" + group.name + "</a></li>";
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
		
		startLoad();
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
			stopLoad();
		});
		
		$("#body").show();
	}
	
	function startLoad(){
		$.mobile.loading( "show", {
            text: "Loading...",
            textVisible: true,
            theme: "a",
            textonly: false,
            html: ""
		});
	}

	function stopLoad(){
		$.mobile.loading( "hide" );
	}
/*
	document.addEventListener("deviceready", function() {
        document.addEventListener("backbutton", function() {
			backButtonFunction();
        }, false);
    }, false);
*/
	goHomePage();
	
});
