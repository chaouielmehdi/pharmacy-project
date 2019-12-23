package com.medicines.servlets;

import java.io.IOException;
import java.io.PrintWriter;

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
@WebServlet("/medicines/update") // ?id
public class UpdateMedicine extends HttpServlet {
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize medicine
		Medicine medicine = RequestHandler.getMedicine(request);
		
		// validate parameter
		if(medicine != null) {
	        daoMedicine.update(medicine);
		}
		
        // return the Json result
        ResponseHandler.sendJson(medicine, response);
	}

}
