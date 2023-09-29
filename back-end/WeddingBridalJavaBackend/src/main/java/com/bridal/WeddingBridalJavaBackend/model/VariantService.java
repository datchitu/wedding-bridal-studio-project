package com.bridal.WeddingBridalJavaBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "variant_services")
public class VariantService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    @Column(length = 500)
    private String description;

    private String avatar;

    @Column(columnDefinition = "boolean default 0")
    private Integer quantity;

    @Column(columnDefinition = "boolean default false")
    private Boolean deleted;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @JsonBackReference
    private Service service;

    @OneToMany(mappedBy = "variantService", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TransactionLineItem> transactionLineItems;
}
