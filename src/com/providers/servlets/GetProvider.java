package com.providers.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOProvider;
import com.pharmacy.pojo.Provider;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/providers/get") // ?id
public class GetProvider extends HttpServlet {
	public DAOProvider daoProvider = new DAOProvider();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize provider
		Provider provider = null;
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
			int id = Integer.parseInt(idString);
	        
	        // get the provider from DB using daoProvider
	        provider = daoProvider.getOneById(id);
		}
		
        // return the Json result
        ResponseHandler.sendJson(provider, response);
	}

}
