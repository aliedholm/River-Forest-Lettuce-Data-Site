<?php

class User{

	public $name;
	public $email;

	public function __construct($name, $email) {
		$this->name = $name;
		$this->email = $email;
	}

	public function getType() {
		return $this->type;
	}
}

class Admin extends User {

	public $permissionLevel;
	public $type = 'Admin';

	public function __construct($name, $email, $permissionLevel) {
		parent::__construct($name, $email);
		$this->permissionLevel = $permissionLevel;
	}

	public function getType() {
		return 'This is and admin with a type of ... ' . parent::getType();
	}
}

class Member extends User {

	public $dateAdded;
	public $type = 'Member';

	public function __construct($name, $email, $dateAdded) {
		parent::__construct($name, $email);
		$this->dateAdded = $dateAdded;
	}

}
