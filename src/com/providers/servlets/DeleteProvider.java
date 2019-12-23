package com.providers.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOProvider;
import com.pharmacy.pojo.Provider;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/providers/delete") // ?id
public class DeleteProvider extends HttpServlet {
	public DAOProvider daoProvider = new DAOProvider();
	
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize parameter
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
	        // delete the provider
			int id = Integer.parseInt(idString);
	        daoProvider.deleteOneById(id);
		}
	}

}
