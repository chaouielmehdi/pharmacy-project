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
@WebServlet("/providers/validate") // ?id
public class ValidateProvider extends HttpServlet {
	public DAOProvider daoProvider = new DAOProvider();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize provider
		Provider provider = RequestHandler.getProvider(request);
		
		provider = daoProvider.getOneByName(provider.getName());
		
		// validate parameter
		if(provider != null) {
	        // return the Json result (not a valid provider)
	        ResponseHandler.sendJson(false, response);
		}
		else {
	        // return the Json result (valid provider)
	        ResponseHandler.sendJson(true, response);
		}
	}

}
