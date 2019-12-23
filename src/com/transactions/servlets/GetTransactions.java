package com.transactions.servlets;

import java.io.IOException;
import java.util.List;

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
@WebServlet("/transactions/getAll")
public class GetTransactions extends HttpServlet {
	public DAOTransaction daoTransaction = new DAOTransaction();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize variable
		List<Transaction> transactions = null;
		
        // get the transaction from DB using daoTransaction
		transactions = daoTransaction.getAll();
        
        // return the Json result
		ResponseHandler.sendJson(transactions, response);
	}

}
