package com.providers.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOProvider;
import com.pharmacy.pojo.Provider;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/providers/create") // provider in query parameters
public class CreateProvider extends HttpServlet {
	public DAOProvider daoProvider = new DAOProvider();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// initialize provider
		Provider provider = RequestHandler.getProvider(request);
		
		// validate parameter
		if(daoProvider.getOneByName(provider.getName()) != null) {
	        // return the Json result (not a valid provider)
	        ResponseHandler.sendJson(null, response);
		}
		else {
			// validate parameter
			if(provider != null) {
				daoProvider.save(provider);
			}
			
	        // return the Json result
	        ResponseHandler.sendJson(provider, response);
		}
		
	}

}
