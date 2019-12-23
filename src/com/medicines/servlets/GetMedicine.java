package com.medicines.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOMedicine;
import com.pharmacy.pojo.Medicine;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/medicines/get") // ?id
public class GetMedicine extends HttpServlet {
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize medicine
		Medicine medicine = null;
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
			int id = Integer.parseInt(idString);
	        
	        // get the medicine from DB using daoMedicine
	        medicine = daoMedicine.getOneById(id);
		}
		
        // return the Json result
        ResponseHandler.sendJson(medicine, response);
	}

}
