package com.transactions.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOTransaction;
import com.pharmacy.pojo.Transaction;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/transactions/get") // ?id
public class GetTransaction extends HttpServlet {
	public DAOTransaction daoTransaction = new DAOTransaction();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize transaction
		Transaction transaction = null;
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
			int id = Integer.parseInt(idString);
	        
	        // get the transaction from DB using daoTransaction
	        transaction = daoTransaction.getOneById(id);
		}
		
        // return the Json result
        ResponseHandler.sendJson(transaction, response);
	}

}
