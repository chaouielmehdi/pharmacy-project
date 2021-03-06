package com.medicines.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOMedicine;
import com.pharmacy.pojo.Medicine;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/medicines/delete") // ?id
public class DeleteMedicine extends HttpServlet {
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize parameter
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
	        // delete the medicine
			int id = Integer.parseInt(idString);
	        daoMedicine.deleteOneById(id);
		}
	}

}
