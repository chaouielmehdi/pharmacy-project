package com.pharmacy.util;

import java.io.BufferedReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.taglibs.standard.lang.jstl.test.Bean1;

import com.google.gson.Gson;
import com.pharmacy.pojo.Medicine;
import com.pharmacy.pojo.Provider;
import com.pharmacy.pojo.Transaction;
import com.pharmacy.pojo.User;

public class RequestHandler {
	
    private static Gson gson = new Gson();

	public static User getUser(HttpServletRequest request) throws IOException{

		request.setCharacterEncoding("UTF-8");
        
		BufferedReader reader = request.getReader();
		return gson.fromJson(reader, User.class);
	}

	public static Provider getProvider(HttpServletRequest request) throws IOException{

		request.setCharacterEncoding("UTF-8");
		
		BufferedReader reader = request.getReader();
		return gson.fromJson(reader, Provider.class);
	}

	public static Medicine getMedicine(HttpServletRequest request) throws IOException{

		request.setCharacterEncoding("UTF-8");
		
		BufferedReader reader = request.getReader();
		return gson.fromJson(reader, Medicine.class);
	}

	public static Transaction getTransaction(HttpServletRequest request) throws IOException{

		request.setCharacterEncoding("UTF-8");
		
		BufferedReader reader = request.getReader();
		return gson.fromJson(reader, Transaction.class);
	}

	public static List<Transaction> getTransactions(HttpServletRequest request) throws IOException{

		request.setCharacterEncoding("UTF-8");
		
		BufferedReader reader = request.getReader();

		Type listType = new TypeToken<List<Transaction>>(){}.getType();
		
		return gson.fromJson(reader, listType);
	}
}
