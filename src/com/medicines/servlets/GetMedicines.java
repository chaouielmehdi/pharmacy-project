package com.medicines.servlets;

import java.io.IOException;
import java.util.List;

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
@WebServlet("/medicines/getAll")
public class GetMedicines extends HttpServlet {
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize variable
		List<Medicine> medicines = null;
		
        // get the medicine from DB using daoMedicine
		medicines = daoMedicine.getAll();
        
        // return the Json result
		ResponseHandler.sendJson(medicines, response);
	}

}
