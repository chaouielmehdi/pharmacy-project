package com.transactions.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOMedicine;
import com.pharmacy.dao.DAOTransaction;
import com.pharmacy.pojo.Medicine;
import com.pharmacy.pojo.Transaction;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/transactions/create") // transaction in query parameters
public class CreateTransaction extends HttpServlet {
	public DAOTransaction daoTransaction = new DAOTransaction();
	public DAOMedicine daoMedicine = new DAOMedicine();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// initialize transaction
		List<Transaction> transactions = RequestHandler.getTransactions(request);

		// validate parameter
		if(transactions != null && !transactions.isEmpty()) {
			for (Transaction transaction : transactions) {
				
				// save transaction
				daoTransaction.save(transaction);
				
				// update quantity in medicines table
				Medicine medicine = daoMedicine.getOneById(transaction.getIdMedicine());
				
				if(transaction.getType().equals("buy")) {
					medicine.setQuantity(medicine.getQuantity()+transaction.getQuantity());
				}
				else {
					medicine.setQuantity(medicine.getQuantity()-transaction.getQuantity());
				}
				
				daoMedicine.update(medicine);
			}
		}
		
        // return the Json result
        ResponseHandler.sendJson(transactions, response);
	}

}
