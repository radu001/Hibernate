<!DOCTYPE html>
<html lang="en">
<%@ page
	import="java.util.List, com.google.entity.MarkersCategory, com.google.dao.impl.MarkersCategoryDaoImpl"%>

<%

if(session.getAttribute("loggedIn") == null) {
response.sendRedirect("signin.jsp");
}
%>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title>reales | real estate web application</title>

<link href="css/font-awesome.css" rel="stylesheet">
<link href="css/simple-line-icons.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<link href="css/datepicker.css" rel="stylesheet">
<link href="css/fileinput.min.css" rel="stylesheet">
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/app.css" rel="stylesheet">

<!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
</head>
<body class="notransition">

	<!-- Header -->

	<div id="header">
		<div class="logo">
			<a href="index.jsp"> <span class="fa fa-home marker"></span> <span
				class="logoText">reales</span>
			</a>
		</div>
		<a href="#" class="navHandler"><span class="fa fa-bars"></span></a>
		<div class="search">
			<span class="searchIcon icon-magnifier"></span> <input type="text"
				placeholder="Search for places...">
		</div>
		<% 
if(session.getAttribute("loggedIn") != null)
            {
            %>
		<div class="headerUserWraper">
			<a href="#" class="userHandler dropdown-toggle"
				data-toggle="dropdown"><span class="icon-user"></span><span
				class="counter">5</span></a> <a href="#"
				class="headerUser dropdown-toggle" data-toggle="dropdown"> <img
				class="avatar headerAvatar pull-left" src="images/avatar-1.png"
				alt="avatar">
				<div class="userTop pull-left">
					<span class="headerUserName">Admin</span> <span
						class="fa fa-angle-down"></span>
				</div>
				<div class="clearfix"></div>
			</a>
			<div class="dropdown-menu pull-right userMenu" role="menu">
				<div class="mobAvatar">
					<img class="avatar mobAvatarImg" src="images/avatar-1.png"
						alt="avatar">
					<div class="mobAvatarName">Admin</div>
				</div>
				<ul>
					<li><a href="#"><span class="icon-settings"></span>Settings</a></li>
					<li class="divider"></li>
					<li><a href="#"><span class="icon-power"></span>Logout</a></li>
				</ul>
			</div>
		</div>
		<%} %>


		<a href="#" class="mapHandler"><span class="icon-map"></span></a>
		<div class="clearfix"></div>
	</div>

	<!-- Left Side Navigation -->

	<div id="leftSide">
		<nav class="leftNav scrollable">
			<div class="search">
				<span class="searchIcon icon-magnifier"></span> <input type="text"
					placeholder="Search for houses, apartments...">
				<div class="clearfix"></div>
			</div>
			<ul>
				<li><a href="explore.jsp"><span
						class="navIcon icon-compass"></span><span class="navLabel">Explore</span></a></li>
				<li><a href="add.jsp"><span class="navIcon icon-plus"></span><span
						class="navLabel">New</span></a></li>


				<li class="hasSub"><a href="#"><span
						class="navIcon icon-link"></span><span class="navLabel">Pages</span><span
						class="fa fa-angle-left arrowRight"></span></a>
					<ul>
						<li><a href="signin.jsp">Sign In</a></li>
						<li><a href="index.jsp">Homepage</a></li>
						<li><a href="explore.jsp">Explore</a></li>
						<li><a href="add.jsp">Add</a></li>
					</ul></li>
			</ul>
		</nav>

	</div>
	<div class="closeLeftSide"></div>

	<!-- Content -->

	<div id="wrapper">
		<div id="mapView" class="mob-min">
			<div class="mapPlaceholder">
				<span class="fa fa-spin fa-spinner"></span> Loading map...
			</div>
		</div>
		<div id="content" class="mob-max">
			<div class="rightContainer">

					
					<%
					
					String strExpired = (String) session.getAttribute("result");
					session.removeAttribute("result");
					if(strExpired != null) {
						System.out.println(strExpired);
					if (strExpired.equals("succes")){
						%><font color="green" size="5"> * Data successfully inserted!</font> <BR> <BR><%
					}
					}  
					
					%>


				<h1>List a New Category</h1>
				<form role="form" action="add.jsp" method="post" onsubmit="return validateCategoryForm()" name="categoryForm">
					<input type="hidden" name="requestType" value="addCategory" />
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="form-group">
								<label>Title</label> <input type="text" class="form-control"
									name="title">
							</div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
								<label>Visibility</label>
								<div class="checkbox custom-checkbox">
									<label> <input type="checkbox" name="visibility"><span
										class="fa fa-check"></span>Public
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" rows="4" name="description"></textarea>
					</div>

					<div class="form-group">
						<input type="submit" class="btn btn-green btn-lg"
							value="Add Category">
					</div>
				</form>

				<BR> <BR>
				<h1>List a New Marker</h1>



				<form role="form" action="add.jsp" method="post" onsubmit="return validateMarkerForm()" name="markerForm">
					<input type="hidden" name="requestType" value="addMarker" />

					<div class="row">

						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="form-group">
								<label>Title</label> <input type="text" class="form-control" name="title">
							</div>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div class="btn-group">
								<label>Category</label>
								<div class="clearfix"></div>
								<a href="#" data-toggle="dropdown"
									class="btn btn-default dropdown-toggle"> <span
									class="dropdown-label">Select...</span>&nbsp;&nbsp;&nbsp;<span
									class="caret"></span>
								</a>
								<ul class="dropdown-menu dropdown-select">
									<%
									
									List<MarkersCategory> categories = (List<MarkersCategory>) 
									session.getAttribute("categories");
									if (categories != null) {
										session.removeAttribute("categories");

										for (MarkersCategory cat : categories) {
									%>
									<li><input type="radio" name="ptype"
										value="<%=cat.getId()%>"><a href="#"><%=cat.getName()%></a></li>

									<%
										}
									}
									%>
								</ul>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" rows="4" name="description"></textarea>
					</div>


					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="form-group">
								<label>Latitude</label> <input type="text" class="form-control" name="latitude"
									id="latitude">
							</div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="form-group">
								<label>Longitude</label> <input type="text" class="form-control" name="longitude"
									id="longitude">
							</div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="input-group">
								<label>Put Marker</label> <input type="button"
									value="Put marker" class="btn btn-green btn-lg"
									style="height: 37px;" id="putMarkerBtn" onclick="putMarker()">
							</div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="form-group">
								<label>Web Site</label>
								<div class="input-group">
									<input class="form-control" type="text" name="webSite">
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3" style="width:50%;">
							<div class="input-group">
								<label>Route</label>
								<textarea class="form-control" rows="1" id="routeString" name="route"></textarea>
							</div>
						</div>



						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="input-group">
								<label>Start route</label> <input type="button"
									value="Start route" class="btn btn-green btn-lg"
									style="height: 37px;" id="startRouteBtn" onclick="startRoute()">
							</div>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
							<div class="input-group">
								<label>Clear route</label> <input type="button"
									value="Clear route" class="btn btn-green btn-lg"
									style="height: 37px;" onclick="clearRoute()">
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<label>Address</label> <input type="text" class="form-control" name="address" id="address">
					</div>

					<div class="form-group">
						<label>Image Url</label> <input type="text" class="form-control" name="imageUrl">
					</div>
					<div class="form-group">
						<label>Icon Url</label> <input type="text" class="form-control" name="iconUrl" value="images/marker-green.png">
					</div>

					
						

					<div class="form-group">
						<input type="submit" class="btn btn-green btn-lg"
							value=" Add Marker ">
					</div>
				</form>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>

	<script src="js/json2.js"></script>
	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/underscore.js"></script>
	<script src="js/moment-2.5.1.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/jquery-ui-touch-punch.js"></script>
	<script src="js/jquery.placeholder.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/jquery.touchSwipe.min.js"></script>
	<script src="js/jquery.slimscroll.min.js"></script>
	<script src="js/jquery.visible.js"></script>
	<script
		src="http://maps.googleapis.com/maps/api/js?sensor=true&amp;libraries=geometry&amp;libraries=places"
		type="text/javascript"></script>
	<script src="js/infobox.js"></script>
	<script src="js/jquery.tagsinput.min.js"></script>
	<script src="js/bootstrap-datepicker.js"></script>
	<script src="js/addMarker.js"></script>
</body>
</html>