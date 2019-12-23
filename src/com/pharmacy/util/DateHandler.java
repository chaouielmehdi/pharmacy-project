package com.pharmacy.util;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.pharmacy.pojo.Provider;

public class DateHandler {
	/*
	public static List<Provider> addOneDayProviders(List<Provider> providers){
		
		List<Provider> providersToReturn = new ArrayList<>();
		
		for (Provider provider : providers) {
			providersToReturn.add(addOneDayProvider(provider));
		}
		
		return providersToReturn;
	}
	
	public static Provider addOneDayProvider(Provider provider){
		
		// get calendar instance
        Calendar calendar = Calendar.getInstance();
        
        // set calendar date with provider date
        calendar.setTime(provider.getContractDate());
        
        // add one day
        calendar.add(Calendar.DATE, 1);
        
        // convert calendar to date
        Date providerDate = calendar.getTime();
		
		provider.setContractDate(providerDate);
		
		return provider;
	}
	*/
}
