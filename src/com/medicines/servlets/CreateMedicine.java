package com.medicines.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOMedicine;
import com.pharmacy.pojo.Medicine;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/medicines/create") // medicine in query parameters
public class CreateMedicine extends HttpServlet {
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// initialize medicine
		Medicine medicine = RequestHandler.getMedicine(request);
		
		System.out.println(medicine);
		
		// validate parameter
		if(daoMedicine.getOneByName(medicine.getName()) != null) {
	        // return the Json result (not a valid medicine)
	        ResponseHandler.sendJson(null, response);
		}
		else {
			// validate parameter
			if(medicine != null) {
				daoMedicine.save(medicine);
			}
			
	        // return the Json result
	        ResponseHandler.sendJson(medicine, response);
		}
		
	}

}
