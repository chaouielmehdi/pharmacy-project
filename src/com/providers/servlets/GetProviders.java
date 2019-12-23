package com.providers.servlets;

import java.io.IOException;
import java.util.List;

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
@WebServlet("/providers/getAll")
public class GetProviders extends HttpServlet {
	public DAOProvider daoProvider = new DAOProvider();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize variable
		List<Provider> providers = null;
		
        // get the provider from DB using daoProvider
		providers = daoProvider.getAll();
		
		for (Provider provider : providers) {
			System.out.println(provider);
		}
        
        // return the Json result
		ResponseHandler.sendJson(providers, response);
	}

}
