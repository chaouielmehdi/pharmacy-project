package com.statistic.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOStatistic;
import com.pharmacy.pojo.Statistic;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/statistic/get")
public class GetStatistic extends HttpServlet {
	public DAOStatistic daoStatistic = new DAOStatistic();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize statistic
		Statistic statistic = null;
		
        // get the statistic from DB using daoStatistic
        statistic = daoStatistic.get();
		
        // return the Json result
        ResponseHandler.sendJson(statistic, response);
	}

}
