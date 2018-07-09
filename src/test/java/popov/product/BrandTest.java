package popov.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import popov.product.config.DatabaseConfiguration;
import popov.product.dto.BrandCreationRequest;
import popov.product.dto.BrandDto;
import popov.product.mapper.BrandMapperImpl;
import popov.product.repository.BrandRepository;
import popov.product.resource.BrandResource;
import popov.product.service.BrandService;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
		BrandResource.class,
		BrandService.class,
		BrandMapperImpl.class,
		BrandRepository.class,
		DatabaseConfiguration.class
})
@DataJpaTest
@EnableAutoConfiguration
public class BrandTest {

	@Autowired
	private BrandResource brandResource;

	@Autowired
	private BrandRepository brandRepository;

	private MockMvc mockMvc;

	@Before
	public void init() {
		this.mockMvc = MockMvcBuilders.standaloneSetup(brandResource).build();
	}

	@Test
	public void brandCreationSuccessTest() throws Exception {
		createBrand();
	}

	@Test
	public void brandGetByIdTest() throws Exception {
		BrandDto created = createBrand();
		mockMvc.perform(get("/api/v1/brands/{0}", created.getId()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(created.getId()))
				.andExpect(jsonPath("$.name").value(created.getName()));
	}

	@Test
	public void findAllTest() throws Exception {
		BrandDto created = createBrand();
		mockMvc.perform(get("/api/v1/brands"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.[*].id").value(hasItem(created.getId().intValue())))
				.andExpect(jsonPath("$.[*].name").value(hasItem(created.getName())));
	}

	private BrandDto createBrand() throws Exception {
		String brandName = "test_brand_" + System.currentTimeMillis();

		BrandCreationRequest value = new BrandCreationRequest();
		value.setName(brandName);

		String strResponse = mockMvc.perform(post("/api/v1/brands")
				.contentType("application/json")
				.content(new ObjectMapper().writeValueAsBytes(value)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNotEmpty())
				.andExpect(jsonPath("$.name").value(brandName))
				.andReturn()
				.getResponse()
				.getContentAsString();

		return new ObjectMapper().readValue(strResponse, BrandDto.class);
	}

}
