package com.bridal.WeddingBridalJavaBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transactions_line_items")
public class TransactionLineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "integer default 1")
    private Integer quantity;

    @Column(name = "total_price", columnDefinition = "double default 0")
    private Double totalPrice;

    @Column(columnDefinition = "boolean default false")
    private Boolean deleted;

    @ManyToOne
    @JoinColumn(name = "variant_service_id", nullable = false)
    @JsonBackReference
    private VariantService variantService;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    @JsonManagedReference
    private Transaction transaction;
}
