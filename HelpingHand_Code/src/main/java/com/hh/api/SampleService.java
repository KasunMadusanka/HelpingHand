package com.hh.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sample")
public class SampleService {
	private static final Logger LOGGER = LoggerFactory.getLogger(SampleService.class);
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<String> getSampleService(@PathVariable("id") Integer id) {
		LOGGER.info("Service GET : /api/sample/" + id);
		return new ResponseEntity<String>("Sample Service Returns with id : " + id, HttpStatus.OK);
	}
}
