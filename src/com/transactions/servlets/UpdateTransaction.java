package com.transactions.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOTransaction;
import com.pharmacy.pojo.Transaction;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/transactions/update") // ?id
public class UpdateTransaction extends HttpServlet {
	public DAOTransaction daoTransaction = new DAOTransaction();
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize transaction
		Transaction transaction = RequestHandler.getTransaction(request);
		
		// validate parameter
		if(transaction != null) {
	        daoTransaction.update(transaction);
		}
		
        // return the Json result
        ResponseHandler.sendJson(transaction, response);
	}

}
