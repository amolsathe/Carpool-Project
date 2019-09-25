package com.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.app.dao.IAdminDao;
import com.app.pojos.AdminUser;
import com.app.pojos.UserDetails;


@CrossOrigin(origins = "http://localhost:4200",allowedHeaders="*")
@RestController
@RequestMapping("/master/admin")
public class AdminController {
	
	@Autowired
	private IAdminDao dao;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@PostMapping("/login")
	public ResponseEntity<?> adminLogin(@RequestBody AdminUser admin)
	{
		try {
			AdminUser a=this.dao.loginAdmin(admin);
			return new ResponseEntity<Result>(new Result("success"),HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		}
		
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addAdminUser(@RequestBody AdminUser admin)
	{
		if (this.dao.registerAdmin(admin))
		{
			return new ResponseEntity<String>("Admin User Added Successfully ",HttpStatus.OK);
		}
		return new ResponseEntity<String>("Registratioin Failed",HttpStatus.FAILED_DEPENDENCY);
	}
	
	/*			String msg="Your one time password for forgot password is = "+otp;
				SimpleMailMessage mailMessage = new SimpleMailMessage();
				mailMessage.setTo(user.getEmail());
				mailMessage.setSubject("One Time Password");
				mailMessage.setText(msg);
				try
				{
					mailSender.send(mailMessage);
				}
				catch (MailException e) 
				{
					System.out.println("inside mail exception");
					e.printStackTrace();
				}
				return "otp";*/
	@GetMapping("/list")
	public ResponseEntity<?> getUsers()
	{
		return new ResponseEntity<List<UserDetails>>(this.dao.getUsers(),HttpStatus.OK);
	}
	@GetMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id)
	{
		try {
			String status=this.dao.deleteUser(id);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		}
	}
}

class Result
{
	private String status;
	private Object data;

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Result(String status) {
		this.status = status;
	}
	public Result(String status, Object obj) {
		this.status = status;
		this.data=obj;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
