<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <% if(session.getAttribute("ValidMem")!=null){%>
        <jsp:forward page="Index.jsp"></jsp:forward>
        <%}%>
<!DOCTYPE html>
<html>

<head>
    <!-- Bootstrap CSS -->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
       integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
       crossorigin="anonymous">
   <link rel="stylesheet" href="./css/header.footer.css">

   <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
   <title>Insert title here</title>

   <script src="./js/members.js"></script>
    <style>
        #safe{
          color: rgb(19, 132, 9);
        }
        .container {
            margin-top: 200px;
            margin-bottom: 270px;
        }
        body{
            background-color: #f8f9fa;
        }
        .container h1{
          color: rgb(108, 117, 125);
       }
    </style>

  </head>

 <body class="text-center">
    <jsp:include page="./include/nav.jsp" />
    
<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <form action="loginOk.jsp" method="post" name="reg_frm">
                	<h1 class="text-center fw-bold mb-7" id="safe">safe seoul</h1>
                		<br><br>
                    <div class="form-group mb-3">
                        <input type="text" placeholder="아이디" name="id" required class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <input type="password" placeholder="비밀번호" name="pw" required class="form-control">
                    </div>
                    <div class="logIn d-flex flex-column text-center">
                        <button type="submit" class="btn btn-primary mb-2">로그인</button>
                       <input type="button" class="btn btn-primary mb-2" value="회원가입" onclick="jacascript:window.location='join.jsp'">
                    </div>
                </form>
            </div>
        </div>
    </div>
  
        
  <jsp:include page="./include/footer.jsp" />   
</body>

</html>