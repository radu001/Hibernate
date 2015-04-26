<!DOCTYPE html>
<%@ page
	import="java.util.List, com.google.entity.MarkersCategory, com.google.entity.Marker"%>

<%
	Marker marker = null;

	MarkersCategory category = null;

	int categoryId = 0;
	
	List<MarkersCategory> categories = null;
	if (session.getAttribute("loggedIn") != null) {

		categories = (List<MarkersCategory>) session
				.getAttribute("categories");
		marker = (Marker) session.getAttribute("marker");
		category = (MarkersCategory) session.getAttribute("category");
		categoryId = category.getId();
		
	} else {
		marker = (Marker) session.getAttribute("marker");
	}
%>

<html lang="en">
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
			<%
				if (session.getAttribute("loggedIn") != null) {
			%>
			<div class="filter">

				<h1 class="osLight">Edit markers and categories</h1>
				<a href="#" class="handleFilter"><span class="icon-equalizer"></span></a>
				<div class="clearfix"></div>
				<div class="filterForm" style="display: none">
					<div class="row">
						<h1>Update Category</h1>
					</div>
					<%
						if (category != null) {
					%>
					<form role="form" action="update" method="post"
						onsubmit="return validateCategoryForm()" name="categoryForm">
						<input type="hidden" name="requestType" value="addCategory" /> <input
							type="hidden" value="<%=category.getId()%>" name="categoryId" />
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
								<div class="form-group">
									<label>Title</label> <input type="text" class="form-control"
										name="title" value="<%=category.getName()%>">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>Description</label>
							<textarea class="form-control" rows="4" name="description"><%=category.getDescription()%></textarea>
						</div>

						<div class="form-group">
							<input type="submit" class="btn btn-green btn-lg"
								value="Update Category">
						</div>
					</form>
					<%
						}
					%>
					<BR> <BR>
					<div class="row">
						<%
							if (marker != null) {
						%>

						<h1>Update Marker</h1>
					</div>
					<form role="form" action="update" method="post"
						onsubmit="return validateMarkerForm()" name="markerForm">
						<input type="hidden" name="requestType" value="addMarker" /> <input
							type="hidden" value="<%=marker.getId()%>" name="markerId" />

						<div class="row">

							<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
								<div class="form-group">
									<label>Title</label> <input type="text" class="form-control"
										value="<%=marker.getName()%>" name="title">
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
								<div class="btn-group">
									<label>Category</label>
									<div class="clearfix"></div>
									<a href="#" data-toggle="dropdown"
										class="btn btn-default dropdown-toggle"> <span
										class="dropdown-label"><%=category.getName()%></span>&nbsp;&nbsp;&nbsp;<span
										class="caret"></span>
									</a>
									<ul class="dropdown-menu dropdown-select">
										<%
											if (categories != null) {
														for (MarkersCategory cat : categories) {
															if (cat.getId() != categoryId) {
										%>
										<li><input type="radio" name="ptype"
											value="<%=cat.getId()%>"><a href="#"><%=cat.getName()%></a></li>
										<%
											} else {
										%>
										<li class="active"><input type="radio" name="ptype"
											checked="checked" value="<%=cat.getId()%>"><a
											href="#"><%=cat.getName()%></a></li>
										<%
											}
														}
													}
										%>
									</ul>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label>Description</label>
							<textarea class="form-control" rows="4" name="description"><%=marker.getDescription()%></textarea>
						</div>


						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
								<div class="form-group">
									<label>Latitude</label> <input type="text" class="form-control"
										name="latitude" id="latitude"
										value="<%=marker.getLatitude()%>">
								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
								<div class="form-group">
									<label>Longitude</label> <input type="text"
										class="form-control" name="longitude" id="longitude"
										value="<%=marker.getLongitude()%>">
								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
								<div class="input-group">
									<label>Put Marker</label> <input type="button"
										value="Put marker" class="btn btn-green btn-lg"
										style="height: 37px;" id="putMarkerBtn"
										onclick="putNewMarker()">
								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
								<div class="form-group">
									<label>Web Site</label>
									<div class="input-group">
										<input class="form-control" type="text" name="webSite"
											value="<%=marker.getSite()%>">
									</div>
								</div>
							</div>
						</div>


						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3"
								style="width: 50%;">
								<div class="input-group">
									<label>Route</label>
									<textarea class="form-control" rows="1" id="routeString"
										name="route"><%=marker.getRouteStr()%></textarea>
								</div>
							</div>



							<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
								<div class="input-group">
									<label>Start route</label> <input type="button"
										value="Start route" class="btn btn-green btn-lg"
										style="height: 37px;" id="startRouteBtn"
										onclick="startRoute()">
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
							<label>Address</label> <input type="text" class="form-control"
								name="address" id="address" value="<%=marker.getAddress()%>">
						</div>

						<div class="form-group">
							<label>Image Url</label> <input type="text" class="form-control"
								name="imageUrl" value="<%=marker.getImageUrl()%>">
						</div>
						<div class="form-group">
							<label>Icon Url</label> <input type="text" class="form-control"
								name="iconUrl" value="<%=marker.getIconUrl()%>">
						</div>




						<div class="form-group">
							<input type="submit" class="btn btn-green btn-lg"
								value=" Update Marker ">
						</div>
					</form>
					<%
						}
					%>
				</div>
			</div>


			<%
				}
			%>


			<%
				if (marker != null) {
			%>
			<div class="singleTop">
				<div>
					<img src="<%=marker.getImageUrl()%>" style="width: 100%;">
				</div>
				<div class="summary">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="summaryItem">
								<h1 class="pageTitle">
									Name :
									<%=marker.getName()%></h1>
								<div class="address">
									<span class="icon-pointer"></span><%=marker.getAddress()%>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="address">
					<p style="text-align: right; padding-right: 5%;">
						<a target="_blank" href="http://www.<%=marker.getSite()%>"><%=marker.getSite()%></a>
					</p>
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="description">
				<h3>Description</h3>
				<p><%=marker.getDescription()%></p>
			</div>

		</div>

		<%
			}
		%>

		<div class="clearfix"></div>
	</div>

	<div class="modal fade" id="contactAgent" role="dialog"
		aria-labelledby="contactLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="contactLabel">Contact Agent</h4>
				</div>
				<div class="modal-body">
					<form class="contactForm">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 cfItem">
								<input type="text" placeholder="Name" class="form-control">
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 cfItem">
								<input type="text" placeholder="Email" class="form-control">
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cfItem">
								<input type="text" placeholder="Subject" class="form-control">
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cfItem">
								<textarea placeholder="Message" rows="3" class="form-control"></textarea>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<a href="#" data-dismiss="modal"
						class="btn btn-round btn-o btn-gray">Close</a> <a href="#"
						class="btn btn-round btn-green">Send message</a>
				</div>
			</div>
		</div>
	</div>

	<script src="js/jquery-2.1.1.min.js"></script>
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
	<script src="js/single.js" type="text/javascript"></script>
</body>
</html>