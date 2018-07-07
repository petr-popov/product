package popov.product.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import popov.product.domain.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}
