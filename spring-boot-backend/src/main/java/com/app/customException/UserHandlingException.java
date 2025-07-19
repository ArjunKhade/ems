package com.app.customException;

@SuppressWarnings("serial")
public class UserHandlingException extends RuntimeException {
public UserHandlingException(String mesg) {
	super(mesg);
}
}
