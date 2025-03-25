package com.av.joltui.jolt_spec_ui.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bazaarvoice.jolt.Chainr;
import com.bazaarvoice.jolt.JsonUtils;

@RestController
public class JoltController {

    @PostMapping("/transform")
    public ResponseEntity<Object> processData(@RequestBody Map<String, String> request) {
        // Add your processing logic here
         try {

            String inputJson = request.get("input");
            String specJson = request.get("spec");

             // Parse the spec JSON string into a List
            Object spec = JsonUtils.jsonToObject(specJson);

            // Parse the input JSON string into a Map
            Object input = JsonUtils.jsonToObject(inputJson);

            // Create a Chainr instance with the spec
            Chainr chainr = Chainr.fromSpec(spec);

            // Apply the transformation
            Object transformedOutput = chainr.transform(input);

            // Return the transformed JSON
            return ResponseEntity.ok(transformedOutput);
        } catch (Exception e) {
            // Handle errors and return a bad request response
            return ResponseEntity.badRequest().body("Error processing transformation: " + e.getMessage());
        }
    }
}