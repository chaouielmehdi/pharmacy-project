package com.pharmacy.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class ResponseHandler {
	
    private static Gson gson = new Gson();
	
	public static void sendJson(Object obj, HttpServletResponse response) throws IOException{
        String objJson = gson.toJson(obj);
        
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(objJson);
        out.flush();
	}
}
