package com.app.dao;

import java.util.List;
import java.util.Set;

import com.app.pojos.AdminUser;
import com.app.pojos.UserDetails;

public interface IAdminDao {
	AdminUser loginAdmin(AdminUser admin);
	boolean registerAdmin(AdminUser admin);
	List<UserDetails> getUsers();
	String deleteUser(int id);
}