import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

public class searchServlet extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// Get input from user
		String query = request.getParameter("query");
		// Set the appropriate attribute, JavaScript will catch this
		request.setAttribute("searchQuery", query);
		
		// Forward back to the page
		request.getRequestDispatcher("index.jsp").forward(request, response);
	}
}