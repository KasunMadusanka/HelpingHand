package com.hh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
	/**
	 * Application Main method
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		openBrowserForUrl("http://localhost:2233/");
	}

	/**
	 * Method for open the default browser and goto the given URL
	 * @param url
	 */
	public static void openBrowserForUrl(String url) {
		String os = System.getProperty("os.name").toLowerCase();
		Runtime rt = Runtime.getRuntime();
		String errorMsg = "***************************************************************\n"
				+ "Unable to open the default browser.\n"
				+ "PLEASE OPEN A PREFERRED BOWSER AND GOTO\n"
				+ "\t'" + url + "'\n"
				+ "***************************************************************";

		try {
			if (os.indexOf("win") >= 0) {
				// this doesn't support showing urls in the form of
				// "page.html#nameLink"
				rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
			} else if (os.indexOf("mac") >= 0) {
				rt.exec("open " + url);
			} else if (os.indexOf("nix") >= 0 || os.indexOf("nux") >= 0) {
				// Do a best guess on unix until we get a platform independent
				// way
				// Build a list of browsers to try, in this order.
				String[] browsers = { "epiphany", "firefox", "mozilla", "konqueror", "netscape", "opera", "links",
						"lynx" };
				// Build a command string which looks like "browser1 "url" ||
				// browser2 "url" ||..."
				StringBuffer cmd = new StringBuffer();
				for (int i = 0; i < browsers.length; i++)
					cmd.append((i == 0 ? "" : " || ") + browsers[i] + " \"" + url + "\" ");
				rt.exec(new String[] { "sh", "-c", cmd.toString() });
			} else {
				System.out.println(errorMsg);
			}
		} catch (Exception e) {
			System.out.println(errorMsg);
		}
	}
	
}
