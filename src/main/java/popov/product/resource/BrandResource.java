package popov.product.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import popov.product.dto.BrandCreationRequest;
import popov.product.dto.BrandDto;
import popov.product.service.BrandService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/v1")
public class BrandResource {

    private final Logger log = LoggerFactory.getLogger(BrandResource.class);

    private static final String ENTITY_NAME = "brand";

    private final BrandService brandService;

    public BrandResource(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/brands")
    public ResponseEntity<BrandDto> createBrand(@Valid @RequestBody BrandCreationRequest brandRequest) throws URISyntaxException {
        BrandDto result = brandService.save(brandRequest);
        return ResponseEntity.created(new URI("/api/v1/brands/" + result.getId()))
                .body(result);
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<BrandDto> getBrand(@PathVariable Long id) {
        BrandDto brandDto = brandService.find(id);
        if (brandDto == null) {
            throw new RuntimeException("not found"); //todo return 404
        }
        return new ResponseEntity<BrandDto>(brandDto, HttpStatus.OK);
    }

}
