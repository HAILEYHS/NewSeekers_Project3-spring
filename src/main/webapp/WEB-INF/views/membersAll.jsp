<%@ page contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ %>
<!DOCTYPE html>
<html>
<head>

<title>User Management</title>
</head>
<body>
<%
MemberService service = new MembersAllService();
ArrayList<MemberDto> dtos = service.execute(request, response);
for(int i= 0; i<dtos.size();i++){
	MemberDto dto = dtos.get(i);
	String id = dto.getId();
	String pw = dto.getPw();
	String name = dto.getName();
	String eMail = dto.geteMail();
	TimeStamp rDate = dto.getrDate();
	String address = dto.getAddress();

%>

<%=id %>, <%=pw %>,<%=name %>,<%=eMail %>,<%=rDate.toLocalDateTime() %>,<%=address %><hr/>

<%
}
%>
</body>
</html>