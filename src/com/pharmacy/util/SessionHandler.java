package com.pharmacy.util;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.pharmacy.pojo.User;

public class SessionHandler {
	
	public static void login(User user, HttpServletRequest request) throws IOException{
		
		// set the session
		HttpSession session = request.getSession();
		session.setAttribute("user", user);
		
	}

	public static void logout(HttpServletRequest request) throws IOException{
		
		// set the session
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		
	}
    
	public static User getConnectedUser(HttpServletRequest request) throws IOException{
		
		// set the session
		HttpSession session = request.getSession();
		return (User) session.getAttribute("user");
		
	}
}
