<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String login = request.getParameter("login");
	String password = request.getParameter("password");
//	JSONObject json = JSONRequestAuthorize.JSON_AuthorizeUser(login, password, "0", "192.168.1.1","0");
	if( login!=null && password!=null) response.sendRedirect("index.jsp");

	System.out.println("LOGIN:" + request.getParameter("login") + " " + request.getParameter("password"));
//	System.out.println("JSON:" + json);

%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>PDA 4PAY</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css">
	<link rel="stylesheet" href="css/mobile.css">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
	<script src="js/mobile.js"></script>
</head>
<body>

<div data-role="page">

	<div data-role="header">
		<h1>4PAY</h1>
	</div><!-- /header -->

	<div data-role="content" class="center_login">
		<form>
	    <ul data-role="listview" data-inset="true">
	        <li data-role="fieldcontain">
	            <label for="name2">Phone:</label>
	            <input type="text" name="login" id="name2" value="" data-clear-btn="true">
	        </li>
	        <li data-role="fieldcontain">
	            <label for="name2">Password:</label>
	            <input type="password" name="password" id="name2" value="" data-clear-btn="true">
	        </li>
			<li class="ui-body ui-body-b">
	            <fieldset class="ui-grid-a">
	                    <div class="ui-block-b"><button type="submit" data-theme="a">Login</button></div>
	            </fieldset>
	        </li>
		</ul>
		</form>
	</div><!-- /content -->

	<div data-role="footer"  data-position="fixed">
		<h4>Ineco-Bank Inc. - @2013</h4>
	</div><!-- /footer -->

</div><!-- /page -->

</body>
</html>