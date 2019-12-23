package com.transactions.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOTransaction;
import com.pharmacy.pojo.Transaction;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/transactions/delete") // ?id
public class DeleteTransaction extends HttpServlet {
	public DAOTransaction daoTransaction = new DAOTransaction();
	
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize parameter
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
	        // delete the transaction
			int id = Integer.parseInt(idString);
	        daoTransaction.deleteOneById(id);
		}
	}

}
